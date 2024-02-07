package com.ts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ts.dao.UserDao;
import com.ts.model.User;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserController {
	@Autowired
	UserDao userDao;
	
	@GetMapping("getUsers")
	public List<User> getUsers() {
		return userDao.getUsers();
	}
	
    @PostMapping("addUser")
    public User addUser(@RequestBody User user) {
        // Validate passwords
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            return null;
        }
        return userDao.addUser(user);
    }
    
    @GetMapping("getUserById/{userId}")
    public User getUserById(@PathVariable int userId) {
    	return userDao.getUserById(userId);
    }
    
    @GetMapping("getUserByName/{userName}")
    public User getUserByName(@PathVariable String userName) {
    	return userDao.getUserByName(userName);
    }
    
    @GetMapping("getUserByEmail/{email}")
    public User getUserByEmail(@PathVariable String email) {
    	return userDao.getUserByEmail(email);
    }
    
    @GetMapping("userLogin/{email}/{password}")
    public User userLogin(@PathVariable String email, @PathVariable String password) {
    	return userDao.userLogin(email, password);
    }
    
    @PutMapping("updateUser")
    public User updateUser(@RequestBody User user) {
    	return userDao.updateUser(user);
    }
    
    @DeleteMapping("deleteUserById/{userId}")
    public String deleteUserById(@PathVariable int userId) {
    	userDao.deleteUserById(userId);
    	return "User with userId : "+userId+" deleted successfully !";
    }
    
}
