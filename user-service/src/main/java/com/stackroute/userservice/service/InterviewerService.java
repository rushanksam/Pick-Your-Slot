package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.InterviewerProfile;

import java.util.List;
import java.util.Optional;

public interface InterviewerService {
    InterviewerProfile saveInterviewerProfile(InterviewerProfile interviewerProfile) throws UserProfileAlreadyExits;
    Optional<InterviewerProfile> findByInterviewerEmailId(String email) throws NoProfileFoundException;
    InterviewerProfile updateInterviewerProfile(InterviewerProfile interviewerProfile) throws NoProfileFoundException;

    List<InterviewerProfile> getInterviewerByTechTrack(String techTrack) throws NoProfileFoundException;
}
