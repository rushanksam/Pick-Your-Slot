package com.stackroute.interviewerservice.service;

import com.stackroute.interviewerservice.exception.InterviewerSlotAlreadyFound;
import com.stackroute.interviewerservice.exception.InterviewerSlotNotFound;
import com.stackroute.interviewerservice.model.InterviewerSlots;

import java.util.List;

public interface InterviewerSlotService {


    InterviewerSlots newInterviewerSlot(InterviewerSlots interviewerSlots) throws InterviewerSlotAlreadyFound;
    InterviewerSlots updateInterviewerSlot(InterviewerSlots interviewerSlots) throws InterviewerSlotNotFound;
    List<InterviewerSlots> allSlotsBasedOnTechTracks(String teckTrack);
    List<InterviewerSlots> allSlotsBasedOnEmailId(String emailID);
    List<InterviewerSlots> allSlotsBasedOnEmailIdAndSlotStatus(String emailID, String slotStatus);
    Boolean deleteInterviewerSlot(String slotId) throws InterviewerSlotNotFound;
    List<InterviewerSlots> getAllSlots()throws InterviewerSlotNotFound;
}
