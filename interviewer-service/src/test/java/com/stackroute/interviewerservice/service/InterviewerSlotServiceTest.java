package com.stackroute.interviewerservice.service;

import com.stackroute.interviewerservice.exception.*;
import com.stackroute.interviewerservice.model.*;
import com.stackroute.interviewerservice.repository.InterviewerSlotRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@SpringBootTest
class InterviewerSlotServiceTest {
    @Mock
    InterviewerSlotRepository interviewerSlotRepository;
    @InjectMocks
    InterviewerSlotServiceImpl interviewerSlotServiceImpl;
    InterviewerSlots interviewerSlots,updateslot;
    @BeforeEach
    void setUp() {
        interviewerSlots=new InterviewerSlots("slot_dhs323df","abc@test.com","testInterviewer","7-05-2022","11:30","12:15","interview for test purpose on java","java",SlotStatus.Available);
        updateslot=new InterviewerSlots("slot_dhs323df","abc@test.com","testInterviewerchng","8-05-2022","11:30","12:15","interview for test update purpose on java","java",SlotStatus.Booked);

    }

    @AfterEach
    void tearDown() {
        interviewerSlots=null;
        updateslot=null;
    }

    @Test
    public void newInterviewerSlot() throws InterviewerSlotAlreadyFound {
        when(interviewerSlotRepository.save(interviewerSlots)).thenReturn(interviewerSlots);
        assertEquals(interviewerSlots,interviewerSlotServiceImpl.newInterviewerSlot(interviewerSlots));

    }

    @Test
    void updateInterviewerSlot() throws InterviewerSlotNotFound {
        Mockito.when(interviewerSlotRepository.existsById(updateslot.getSlotId())).thenReturn((true));
        Mockito.when(interviewerSlotRepository.save(updateslot)).thenReturn((updateslot));
        assertEquals(updateslot,interviewerSlotServiceImpl.updateInterviewerSlot(updateslot));
    }

    @Test
    void allSlotsBasedOnTechTracks() {
        when(interviewerSlotRepository.findByemailId(interviewerSlots.getEmailId())).thenReturn(List.of(interviewerSlots));
        assertEquals(List.of(interviewerSlots),interviewerSlotServiceImpl.allSlotsBasedOnEmailId(interviewerSlots.getEmailId()));
    }

    @Test
    void allSlotsBasedOnEmailId() {
        when(interviewerSlotRepository.findBytechTrack(interviewerSlots.getTechTrack())).thenReturn(List.of(interviewerSlots));
        assertEquals(List.of(interviewerSlots),interviewerSlotServiceImpl.allSlotsBasedOnTechTracks(interviewerSlots.getTechTrack()));
    }
}