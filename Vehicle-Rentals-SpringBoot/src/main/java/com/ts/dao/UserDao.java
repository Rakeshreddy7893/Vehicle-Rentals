package com.ts.dao;

import java.util.Random;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ts.config.TwilioConfig;
import com.ts.model.User;

@Service
public class UserDao {
	
	@Autowired
	UserRepository userRepository;
	
    @Autowired
    private TwilioConfig twilioConfig;
    
	@Autowired
	private JavaMailSender mailSender;

    // Hash the password using BCrypt
    private String hashPassword(String plainTextPassword) {
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }
	
	public User addUser(User user) {
		
		// Send a welcome email
		sendWelcomeEmail(user);
		
		// Send OTP via Twilio
		sendOtpViaTwilio(user);
		
		user.setPassword(hashPassword(user.getPassword()));
		user.setConfirmPassword(hashPassword(user.getConfirmPassword()));
		
		// Save the employee
		User savedUser = userRepository.save(user);

		return savedUser;
	}
	

	private void sendWelcomeEmail(User user) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("Welcome to our website");
		message.setText("Dear " + user.getUserName() + ",\n\n"
				+ "Thank you for registering ");

		mailSender.send(message);
	}
	
    private void sendOtpViaTwilio(User user) {
        String phoneNumber = user.getPhoneNumber();
        twilioConfig.sendOtp(phoneNumber, generateOtp());
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

}
