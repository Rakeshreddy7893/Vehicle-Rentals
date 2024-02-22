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
	private JavaMailSender mailSender;

	private String hashPassword(String plainTextPassword) {
		return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
	}

	public User addUser(User user) {
		sendWelcomeEmail(user);
		user.setPassword(hashPassword(user.getPassword()));
		User savedUser = userRepository.save(user);
		return savedUser;
	}

	private void sendWelcomeEmail(User user) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("Welcome to VEHICLE-HOST-HUB");
		message.setText("Dear " + user.getUserName() + ",\n\n" + "Thank you for registering ");

		mailSender.send(message);
	}

	public User getUserById(int userId) {
		return userRepository.findById(userId);
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
		if (userRepository.findById(user.getUserId()) != null)
			return userRepository.save(user);
		else {
			return null;
		}
	}

	public void deleteUserById(int userId) {
		userRepository.deleteById(userId);
	}

}
