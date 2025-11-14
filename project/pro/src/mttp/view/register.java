package mttp.view;

//import java.security.SecureRandom;
import java.sql.*;
import mttp.controller.*;

public class register extends module {


    public void Reg() {  // Fixed: Made static and added args
        // Added Scanner declaration

        System.out.println("Register (must use " + gm + ")");

        System.out.print("Email: ");
        String email = sc.nextLine().trim();  // Added trim for cleanliness
        System.out.print("Enter password: ");
        String password = sc.nextLine().trim();


        System.out.println("=== Create pin ===");

        System.out.print("Enter 6 Digits Pin : ");
        String Pin = sc.nextLine();

        // 6 pin only
        if (!Pin.matches("\\d{6}")) {
            System.out.println("❌ PIN must be exactly 6 digits and numeric only.");
            sc.close();
            return;
        }
        int PinNumber = Integer.parseInt(Pin);

        // ✅ Step 1: Check if email ends with @gmail.com
        if (!email.endsWith(gm)) {
            System.out.println("❌ Invalid! Please use a proper Gmail address (e.g., user@gmail.com)");
            sc.close();
            return; // stop registration
        }

        // ✅ Step 2: Check if email is already registered (duplicate check)
        if (isEmailRegistered(email)) {
            System.out.println("❌ Email already registered! Please use a different email.");
            sc.close();
            return; // stop registration
        }

        // ✅ Step 3: Proceed with registration if valid and not duplicate
        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPass)) {

            System.out.println("✅ Connected to database!");

            String insertSql = "INSERT INTO users( username,password,Pin) VALUES (?,?,?)";
            PreparedStatement insertStmt = conn.prepareStatement(insertSql);
            insertStmt.setString(1, email);
            insertStmt.setString(2, password);
            insertStmt.setInt(3, PinNumber);  // Note: Hash password in real app (e.g., BCrypt)
            int rows = insertStmt.executeUpdate();

            if (rows > 0) {
                System.out.println("✅ Registration successful!");
                System.out.println("✅ Gmail address accepted: " + email);

            } else {
                System.out.println("⚠️ Registration failed.");
            }
            insertStmt.close();
        } catch (SQLException e) {
            System.out.println("⚠️ Database error: " + e.getMessage());
        }

        sc.close();
    }


    // Helper method to check if email is already registered
    private static boolean isEmailRegistered(String email) {
        String checkSql = "SELECT COUNT(*) FROM users WHERE username = ?";
        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPass);
             PreparedStatement checkStmt = conn.prepareStatement(checkSql)) {

            checkStmt.setString(1, email);
            ResultSet rs = checkStmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;  // If count > 0, email exists
            }
        } catch (SQLException e) {
            System.out.println("⚠️ Error checking email: " + e.getMessage());
        }
        return false;

    }

    public static void main(String[] args) {
        register b = new register();
        b.Reg();
    }
}
