package mttp.authenticator;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.*;
import mttp.controller.*;

public class top extends  module {

// Note: This is a basic TOTP implementation. For production, use a robust library like 'totp4j' or 'google-authenticator'.
// You'll need to add dependencies (e.g., via Maven) for crypto if not already included.

        private static final String HMAC_SHA1 = "HmacSHA1";

        public static void main(String[] args) {


            System.out.print("Enter authenticator code: ");
            String inputCode = sc.nextLine();

            // Assume the 'code' in DB is the TOTP secret key (base64 encoded)
            // In a real app, store the secret securely and generate TOTP on the fly.

            boolean authenticated = false;

            // Query the first database
            try (Connection conn1 = DriverManager.getConnection(url, dbUser, dbPass)) {
                String checkEmailSql = "SELECT * FROM users WHERE  code = ?";
                PreparedStatement checkStmt = conn1.prepareStatement(checkEmailSql);

                checkStmt.setString(2, inputCode);
                ResultSet rs = checkStmt.executeQuery();

                if (rs.next()) {
                    String secretKey = rs.getString("code"); // Retrieve the TOTP secret key from DB
                    if (verifyTOTP(secretKey, inputCode)) {
                        System.out.println("Authentication successful in logs!");
                        authenticated = true;
                    } else {
                        System.out.println("Invalid authenticator code for logs.");
                    }
                } else {
                    System.out.println("User not found in logs.");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }

            // If not authenticated in first DB, try second (optional fallback)
            if (!authenticated) {
                try (Connection conn2 = DriverManager.getConnection(url, dbUser, dbPass)) {
                    String checkEmailSql2 = "SELECT * FROM users WHERE  code = ?";
                    PreparedStatement checkStmt2 = conn2.prepareStatement(checkEmailSql2);

                    checkStmt2.setString(2, inputCode);
                    ResultSet rs2 = checkStmt2.executeQuery();

                    if (rs2.next()) {
                        String secretKey = rs2.getString("code");
                        if (verifyTOTP(secretKey, inputCode)) {
                            System.out.println("Authentication successful in logs!");
                            authenticated = true;
                        } else {
                            System.out.println("Invalid authenticator code for logs.");
                        }
                    } else {
                        System.out.println("User not found in logs.");
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            if (!authenticated) {
                System.out.println("Authentication failed.");
            }
        }

        // Basic TOTP verification method (simplified; use a library for production)
        private static boolean verifyTOTP(String secretKey, String inputCode) {
            try {
                // Decode the base64 secret key
                byte[] keyBytes = Base64.getDecoder().decode(secretKey);
                SecretKeySpec keySpec = new SecretKeySpec(keyBytes, HMAC_SHA1);
                Mac mac = Mac.getInstance(HMAC_SHA1);
                mac.init(keySpec);

                // Get current time window (30-second intervals)
                long timeWindow = System.currentTimeMillis() / 1000 / 30;

                // Generate TOTP for current and adjacent windows (to account for clock skew)
                for (int i = -1; i <= 1; i++) {
                    byte[] timeBytes = longToBytes(timeWindow + i);
                    byte[] hash = mac.doFinal(timeBytes);
                    int offset = hash[hash.length - 1] & 0x0F;
                    int code = ((hash[offset] & 0x7F) << 24) |
                            ((hash[offset + 1] & 0xFF) << 16) |
                            ((hash[offset + 2] & 0xFF) << 8) |
                            (hash[offset + 3] & 0xFF);
                    code %= 1000000; // 6-digit code
                    String generatedCode = String.format("%06d", code);
                    if (generatedCode.equals(inputCode)) {
                        return true;
                    }
                }
                return false;
            } catch (NoSuchAlgorithmException | InvalidKeyException e) {
                e.printStackTrace();
                return false;
            }
        }

        private static byte[] longToBytes(long value) {
            byte[] result = new byte[8];
            for (int i = 7; i >= 0; i--) {
                result[i] = (byte) (value & 0xFF);
                value >>= 8;
            }
            return result;
        }
    }


