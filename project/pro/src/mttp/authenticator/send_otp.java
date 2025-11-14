package mttp.authenticator;

import java.sql.*;
import java.security.SecureRandom;

import mttp.controller.*;  // Assuming 'module' is defined here

public class send_otp extends module {

    static void main(String[] args) {  // Fixed: Added 'public' and 'String[] args' for standard main method
        // Added Scanner declaration

        System.out.print("Enter username: ");
        String username = sc.nextLine().trim();  // Added trim for cleanliness

        // Call UT with user details
        UT(username);
        sc.close();
    }

    // Utility method to generate and save auth code for a specific user
    public static void UT(String username) {
        // Generate the code
        String generatedOtp  = generateOtp ();

        // Save to database for the specific user
        saveAuthCode(generatedOtp , username);

        System.out.println("✅ Authentication Otp  generated: " + generatedOtp  + " for user: " + username);
    }

    // --- Generate 6-digit random code ---
    static String generateOtp () {
        SecureRandom random = new SecureRandom();
        int number = random.nextInt(900000) + 100000; // 100000–999999
        return String.valueOf(number);
    }

    // Inside your registration try block, after insert


    // Fixed: UPDATE the 'code' column for a specific user based on username
    // Assumption: 'users' table has 'username' and 'code' columns
    static void saveAuthCode(String Otp , String username) {
        String sql = "UPDATE users SET Otp = ? WHERE username = ?";

        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPass);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, Otp);
            stmt.setString(2, username);
            int rows = stmt.executeUpdate();


            if (rows > 0) {
                System.out.println("💾 Code saved to database successfully for user: " + username);
               /// String otp = generateOtp();  // Generate OTP
               ///  OtpSender.sendOtpEmail(username, otp);
            } else {
                System.out.println("⚠️ No user found with matching username.");
            }

        } catch (SQLException e) {
            System.out.print("⚠️ Database error: " + e.getMessage());
        }
    }
}
