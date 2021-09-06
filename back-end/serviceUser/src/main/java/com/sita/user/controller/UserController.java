package com.sita.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sita.user.entity.Users;
import com.sita.user.repository.UserRepository;

@RestController
@RequestMapping("/UserService")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserRepository repo;
	
	@PostMapping("/signUp")
	public ResponseEntity<?> signUp(@RequestBody Users user){
		repo.save(user);
		return ResponseEntity.ok(user);
	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Users user){
		return ResponseEntity.ok(repo.findUsersByEmail(user.getEmail()));
	}
}
