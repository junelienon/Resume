package resume.landing.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import resume.landing.Dito.ContactRequest;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void send(ContactRequest  request) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("junelienonsalamanca08@gmail.com");
        message.setSubject("New message landing page");
        message.setText(
                "Name: " + request.getName() + "\n" +
                "Email: " + request.getEmail() + "\n\n" +
                request.getMessage()
        );

        mailSender.send(message);
    }


    
}
