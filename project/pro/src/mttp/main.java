package mttp;

import mttp.view.*;
import mttp.controller.*;

public class main extends module {
    public static void ain(String[] test)  {
    
        System.out.println(" YOUR ACCOUNT ");
        while (true) {
            System.out.println("\nMenu:");
            System.out.println("✅ log in");
            System.out.println("💾 register");
            System.out.print("Please choices option log in & Register: ");

            String choice = sc.nextLine();

            switch (choice) {
                case  "Log in":
                    login o = new login();
                    o.log();
                    break;
                case "Register":
                    register b = new register();
                    b.Reg();
                    break;

                case "cancel":

                    break;

                default:
                    System.out.println("kupal dadayain mo pa di kana nga pumili ng number" + sc);
                    break;


            }


        }
    }
}



