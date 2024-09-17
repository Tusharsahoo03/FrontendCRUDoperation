package com.org.spring_data_rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private StudentRepository userRepository;

    public boolean authenticate(String email, String password) {
        Optional<Student> student = userRepository.findByEmail(email);
        return student.isPresent() && student.get().getPassword().equals(password);
    }
    
    public List<Student>FetchAllStudents(){
    	return userRepository.findAll();
    }
}