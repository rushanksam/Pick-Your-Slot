package com.stackroute.interviewerservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.interviewerservice.model.InterviewerSlots;
import com.stackroute.interviewerservice.model.SlotStatus;
import com.stackroute.interviewerservice.service.InterviewerSlotService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest
class InterviewerSlotControllerTest {
    @InjectMocks
    InterviewerSlotController interviewerSlotController;
    @Mock
    InterviewerSlotService interviewerSlotService;

    InterviewerSlots interviewerSlots,updateslot;
    MockMvc mockMvc;
    @BeforeEach
    void setUp() {
        mockMvc= MockMvcBuilders.standaloneSetup(interviewerSlotController).build();
        interviewerSlots=new InterviewerSlots("slot_b277d32","controll@test.com","testInterviewer","7-05-2022","11:30","12:15","interview for test purpose on java","java", SlotStatus.Available);
        updateslot=new InterviewerSlots("slot_b277d32","controll@test.com","testInterviewerchange","8-05-2022","12:30","01:15","interview for test update purpose on java","java",SlotStatus.Booked);
    }

    @AfterEach
    void tearDown() {
        interviewerSlots=null;
        updateslot=null;
    }

    @Test
    void newIntervieweerSlots() throws Exception {
        Mockito.when(interviewerSlotService.newInterviewerSlot(any())).thenReturn(interviewerSlots);
        mockMvc.perform(post("/api/v1/newSlot").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(interviewerSlots))
        ).andExpect(status().isCreated());
    }

    @Test
    void updateIntervieweerSlots() throws Exception {
        Mockito.when(interviewerSlotService.updateInterviewerSlot(interviewerSlots)).thenReturn(interviewerSlots);
        mockMvc.perform(put("/api/v1/updateSlot").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(interviewerSlots))
        ).andExpect(status().isAccepted());
    }

    @Test
    void allslotsBasedOnTeckTrack()throws Exception {
        mockMvc.perform(get("/api/v1/techTrack/"+interviewerSlots.getTechTrack()).contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(interviewerSlots))
        ).andExpect(status().isFound());
    }

    @Test
    void allslotsBasedOnEmailId()throws Exception{
        mockMvc.perform(get("/api/v1/"+interviewerSlots.getEmailId()).contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(interviewerSlots))
        ).andExpect(status().isOk());

    }

}