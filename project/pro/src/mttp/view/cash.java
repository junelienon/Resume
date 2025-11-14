package mttp.view;
import mttp.controller.*;

public class cash extends module {
    public void ATM() {

        String expectedInput = ("thanks");

        //  String payment ="";

        while (true) {

            System.out.println(" YOUR ACCOUNT ");


            System.out.println("\nMenu:");
            System.out.println("Cash out(cancel & payment)");
            System.out.println("Cash in(cancel & payment)");
            System.out.print("Please choise option cash in  & cash out: ");

            String choice = sc.nextLine();

            switch (choice) {
                case "cash out":

                    System.out.print("cash out: ");
                    String casout = sc.nextLine();//.trim().toLowerCase();
                    //String pay = pymt.nextLine().trim().toLowerCase();
                    if (casout.equals("payment")) {
                        System.out.println(" successfull payment " + expectedInput);

                    } else if (casout.equals("cancel")) {
                        System.out.println("your payment not success please try again");

                    }
                    break;

                case "cash in":

                    System.out.print("cash in:");
                    String casin = sc.nextLine();//.trim().toLowerCase();
                    if (casin.equals("payment")) {
                        System.out.println("success cash in " + expectedInput);

                    } else if (casin.equals("cancel")) {
                        System.out.println(" cash in not success please try again");

                    }
                    break;
                case "3":

                            break;

                        case "4":
                            break;
                            default:
                            System.out.println("kupal dadayain mo pa di kana nga pumili ng number" + sc);
                            break;

                        }

            sc.close();

                    }
            }
        }
