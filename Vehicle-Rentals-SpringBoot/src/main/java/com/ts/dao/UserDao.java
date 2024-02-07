package com.ts.dao;

import java.util.List;
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
		String otp = generateOtp();
		user.setOtp(otp);
		sendWelcomeEmail(user);		// Send a welcome email
		sendOtpViaTwilio(user);		// Send OTP via Twilio
		user.setPassword(hashPassword(user.getPassword()));
		user.setConfirmPassword(hashPassword(user.getConfirmPassword()));
		User savedUser = userRepository.save(user);   		// Save the employee
		return savedUser;
	}
	

	private void sendWelcomeEmail(User user) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("Welcome to VEHICLE-HOST-HUB");
		message.setText("Dear " + user.getUserName() + ",\n\n"
				+ "Thank you for registering ");

		mailSender.send(message);
	}
	
    private void sendOtpViaTwilio(User user) {
        String phoneNumber = user.getPhoneNumber();
        twilioConfig.sendOtp(phoneNumber, user.getOtp());
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

	public User getUserById(int userId) {
		return userRepository.findById(userId).orElse(null);
	}

	public User getUserByName(String userName) {
		return userRepository.findByName(userName);
	}

	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User userLogin(String email, String password) {
		User user = userRepository.findByEmail(email);
	    if (user != null && BCrypt.checkpw(password, user.getPassword())) {
	        return user;
	    } else {
			return null;
	    }
	}

	public List<User> getUsers() {
		return userRepository.findAll();
	}

	public User updateUser(User user) {
		if(userRepository.findById(user.getUserId()) != null)return userRepository.save(user);
		else {
			return null;
		}
	}

	public void deleteUserById(int userId) {
		userRepository.deleteById(userId);
	}

}
