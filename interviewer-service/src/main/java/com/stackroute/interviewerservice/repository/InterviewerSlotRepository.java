package com.stackroute.interviewerservice.repository;

import com.stackroute.interviewerservice.model.InterviewerSlots;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InterviewerSlotRepository extends MongoRepository<InterviewerSlots,String> {
    List<InterviewerSlots> findBytechTrack(String techTrack);
    List<InterviewerSlots> findByemailId(String emailId);
    List<InterviewerSlots> findByEmailIdAndSlotStatus(String emailId, String status);
}
