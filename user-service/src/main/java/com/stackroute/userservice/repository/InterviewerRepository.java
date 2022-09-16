package com.stackroute.userservice.repository;

import com.stackroute.userservice.model.InterviewerProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InterviewerRepository extends MongoRepository<InterviewerProfile,String> {
    List<InterviewerProfile> findByTechTrack(String techTrack);
}
