package mttp.view;

import java.sql.*;

import mttp.controller.*;

public class login extends module {

    public void log() {
        System.out.println("=== LOGIN ACCOUNT ===");
        cash cs = new cash();

        // --- Ask for user input ---
        System.out.print("Enter email: ");
        String email = sc.nextLine().trim();

        System.out.print("Enter password: ");
        String password = sc.nextLine().trim();

        System.out.println("=== Pin ===");

        System.out.print("Enter 6 Pin: ");
        String pin = sc.nextLine().trim();
        // --- Gmail validation ---
        String gmailRegex = "^[a-zA-Z0-9._%+-]+@gmail\\.com$";
        boolean isGmail = email.matches(gmailRegex);

        if (!isGmail) {
            System.out.println("❌ Invalid email! Please use a proper Gmail address (e.g., user@gmail.com)");
            return; // stop login if not a Gmail
        }

        // --- Database login process ---
        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPass)) {
            String checkEmailSql = "SELECT * FROM users WHERE username = ? AND password = ? AND Pin  = ? ";
            PreparedStatement checkStmt = conn.prepareStatement(checkEmailSql);
            checkStmt.setString(1, email);
            checkStmt.setString(2, password);
            checkStmt.setString(3, pin);
            ResultSet rs = checkStmt.executeQuery();


            if (rs.next()) {
                System.out.println("✅ Login successful! Welcome, " + rs.getString("username") + ".");
                cs.ATM(); // call cash view
            } else {
                System.out.println("❌ Login failed! Invalid username or password.");
            }

            rs.close();
            checkStmt.close();
        } catch (SQLException e) {
            System.out.println("⚠️ Database connection error: " + e.getMessage());
        }

        sc.close();
    }

    public static void main(String[] args) {
        login obj = new login();
        obj.log();

    }
}