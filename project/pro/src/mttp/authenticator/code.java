package mttp.authenticator;

import java.sql.*;
import java.security.SecureRandom;
import java.util.Scanner;  // Added import for Scanner
import mttp.controller.*;  // Assuming 'module' is defined here

public class code extends module {

    // Added main method to allow running the class directly
    public static void main(String[] args) {
        generate(args);  // Call the existing generate method with command-line args
    }

    public static void generate(String[] args) {
        Scanner sc = new Scanner(System.in);  // Added Scanner for user input

        // Prompt for username and password
        System.out.print("Enter email): ");
        String username = sc.nextLine();  // Read username from input
        System.out.print("Enter password: ");
        String password = sc.nextLine();  // Read password from input

        // Generate the code
        String generatedCode = generateCode();

        // Save to database
        saveAuthCode(generatedCode, username, password);  // Pass all three parameters

        System.out.println("✅ Authentication code generated: " + generatedCode + " for user: " + username + " with password: " + password);

        sc.close();  // Close Scanner to prevent resource leaks
    }

    // --- Generate 6-digit random code ---
    public static String generateCode() {
        SecureRandom random = new SecureRandom();
        int number = random.nextInt(900000) + 100000; // 100000–999999
        return String.valueOf(number);
    }

    // Fixed: Changed to UPDATE the 'code' column in 'users' table for a specific user
    // Assumption: 'users' table has 'username', 'password', and 'code' columns
    // If you want to INSERT into a separate 'auth_codes' table, let me know for adjustments
    public static void saveAuthCode(String code, String username, String password) {
        String sql = "UPDATE users SET code = ? WHERE username = ? AND password = ?";  // Fixed: Added '=' for password

        try (Connection conn = DriverManager.getConnection(url, dbUser, dbPass);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, code);
            stmt.setString(2, username);
            stmt.setString(3, password);  // Fixed: Use index 3 for password

            int rowsAffected = stmt.executeUpdate();  // Use executeUpdate for INSERT/UPDATE
            if (rowsAffected > 0) {
                System.out.println("💾 Code saved to database successfully for user: " + username);

            } else {
                System.out.println("⚠️ No user found with matching username and password.");
            }

        } catch (SQLException e) {
            System.out.println("⚠️ Database error: " + e.getMessage());
        }
    }
}
