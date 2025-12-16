package resume.landing.Controller;

import org.springframework.stereotype.Controller;
import resume.landing.Service.EmailService;
import resume.landing.Dito.ContactRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController  {


      private final EmailService emailService;

    public  MainController(EmailService emailService) {
        this.emailService = emailService;
    }
    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/services")
    public String services() {
        return "services";
    }

    @GetMapping("/portfolio")
    public String portfolio() {
        return "portfolio";
    }

    @GetMapping("/skills")
    public String skills() {
        return "skills";
    }

    @GetMapping("/projects")
    public String projects() {
        return "projects";
    }


 @GetMapping("/contact")
 public String contact(Model model) {
     model.addAttribute("contact", new ContactRequest());
     return "contact";
 }
@PostMapping("/contact")
public String send(@ModelAttribute ContactRequest request, Model model) {
    emailService.send(request);
    model.addAttribute("success", true);
    return "index";
}




}




