package com.org.spring_data_rest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Student {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
	private String name; 
	private int age;
    @Column(unique = true) 
	private String email;
	private String password;
	
}
