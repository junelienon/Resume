package mttp.authenticator;

import java.sql.*;

import mttp.controller.*;
import mttp.view.cash;



public class otp extends module {

     static void main (String[] args) {  // Fixed: Made static and added arg

         System.out.println("=== type Otp message ===");
        cash cs = new cash();
        // --- Ask for user input ---
        System.out.print("Enter email: ");
        String email = sc.nextLine().trim();
        System.out.println("=== send Otp message ===");
        System.out.print("Enter Otp : ");
        String Otp  = sc.nextLine().trim();
        
        // --- Gmail validation ---
        String gmailRegex = "^[a-zA-Z0-9._%+-]+@gmail\\.com$";
        boolean isGmail = email.matches(gmailRegex);

        if (!isGmail) {
            System.out.println("❌ Invalid email! Please use a proper Gmail address (e.g., user@gmail.com)");
            sc.close();
            return; // stop if not a Gmail
        }
        // --- Database OTP verification process ---
        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPass)) {  // Fixed: dbCode to dbPass (assuming dbPass is correct)
            String checkEmailSql = "SELECT * FROM users WHERE username = ? AND Otp  = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkEmailSql);
            checkStmt.setString(1, email);
            checkStmt.setString(2, Otp );
            ResultSet rs = checkStmt.executeQuery();
            if (rs.next()) {
                System.out.println("✅ OTP verification successful! Welcome, " + rs.getString("username") + ".");  // Fixed: "email" to "username" (assuming column name)
                cs.ATM(); // call cash view
            } else {
                System.out.println("❌ OTP verification failed! Invalid Otp .");
            }
            rs.close();
            checkStmt.close();
        } catch (SQLException e) {
            System.out.println("⚠️ Database connection error: " + e.getMessage());
        }
        sc.close();
    }
}
