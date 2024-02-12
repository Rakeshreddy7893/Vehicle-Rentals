//package com.ts.model;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//
//@Entity
//public class User {
//	@Id
//	@GeneratedValue
//	private int userId;
//	
//	private String userName;
//	private String gender;
//	private String country;
//	private String role;
//	private String phoneNumber;
//	
//	@Column(unique = true)
//	private String email;
//	private String password;
//
//	
//	public User() { }
//
//	public User(String userName, String gender, String country,String role, String phoneNumber, String email, String password) {
//		this.userName = userName;
//		this.gender = gender;
//		this.country = country;
//		this.role = role;
//		this.phoneNumber = phoneNumber;
//		this.email = email;
//		this.password = password;
//	}
//
//	public User(int userId, String userName, String gender, String country,String role, String phoneNumber, String email, String password) {
//		this.userId = userId;
//		this.userName = userName;
//		this.gender = gender;
//		this.country = country;
//		this.role = role;
//		this.phoneNumber = phoneNumber;
//		this.email = email;
//		this.password = password;
//	}
//
//	public int getUserId() {
//		return userId;
//	}
//
//	public String getUserName() {
//		return userName;
//	}
//
//	public void setUserName(String userName) {
//		this.userName = userName;
//	}
//
//	public String getGender() {
//		return gender;
//	}
//
//	public void setGender(String gender) {
//		this.gender = gender;
//	}
//
//	public String getCountry() {
//		return country;
//	}
//
//	public void setCountry(String country) {
//		this.country = country;
//	}
//	
//	public String getRole() {
//		return role;
//	}
//	
//	public void setRole(String role) {
//		this.role = role;
//	}
//
//	public String getPhoneNumber() {
//		return phoneNumber;
//	}
//
//	public void setPhoneNumber(String phoneNumber) {
//		this.phoneNumber = phoneNumber;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//	
//    public void setPassword(String password) {
//    	this.password = password;
//    }
//	
//}



package com.ts.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue
    private int userId;

    private String userName;
    private String gender;
    private String country;
    private String role;
    private String phoneNumber;

    @Column(unique = true)
    private String email;
    private String password;

    // One-to-many mapping with ImageModel class
    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private List<ImageModel> imageList = new ArrayList<>();

    public User() {
    }

    public User(String userName, String gender, String country, String role, String phoneNumber, String email, String password) {
        this.userName = userName;
        this.gender = gender;
        this.country = country;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }
    
    public User(int userId, String userName, String gender, String country, String role, String phoneNumber, String email, String password) {
    	this.userId = userId;
        this.userName = userName;
        this.gender = gender;
        this.country = country;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

    public int getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ImageModel> getImageList() {
        return imageList;
    }

    public void setImageList(List<ImageModel> imageList) {
        this.imageList = imageList;
    }
}
