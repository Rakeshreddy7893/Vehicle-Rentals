package com.ts.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ts.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
