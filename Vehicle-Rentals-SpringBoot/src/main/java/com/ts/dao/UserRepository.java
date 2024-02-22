package com.ts.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ts.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("from User where userName = :userName")
	User findByName(@Param("userName") String userName);

	@Query("from User where email = :email and password = :password")
	User userLogin(@Param("email") String email, @Param("password") String password);

	@Query("from User where email = :email")
	User findByEmail(@Param("email") String email);

	@Query("from User where userId= :id")
	User findById(@Param("id") int id);
}
