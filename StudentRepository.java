package com.org.spring_data_rest;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "students", path = "students")
@CrossOrigin(origins = "*") 

public interface StudentRepository extends JpaRepository<Student, Integer> {
	 Optional<Student> findByEmail(String email);
}

