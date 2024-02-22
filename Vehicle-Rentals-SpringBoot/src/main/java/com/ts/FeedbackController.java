package com.ts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FeedbackController {

	@Autowired
	private JavaMailSender mailSender;

	@GetMapping("/sendMail/{email}/{text}")
	public void sendFeedback(@PathVariable String email, @PathVariable String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo("maddeniuday3421@gmail.com");
		message.setSubject("Mail from " + email);
		message.setText(text + ",\n\n" + "hope my issue resolves soon ! ");

		mailSender.send(message);
	}
}
