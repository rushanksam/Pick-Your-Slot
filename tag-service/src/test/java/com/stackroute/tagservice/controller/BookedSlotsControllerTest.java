/**
 * @author mohitraghuvanshi
 * Date 27/04/22
 **/
package com.stackroute.tagservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.tagservice.exception.SlotAlreadyExistsException;
import com.stackroute.tagservice.model.BookedSlots;
import com.stackroute.tagservice.service.BookedSlotsService;
import com.stackroute.tagservice.service.BookedSlotsServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockRestServiceServer
public class BookedSlotsControllerTest {

    @Mock
    private BookedSlotsServiceImpl bookedSlotsServiceImpl;
    @Mock
    private BookedSlotsService bookedSlotsService;

    private BookedSlots addBookedSlots, updateBookedSlots;

    private MockMvc mockMvc;

    @InjectMocks
    private BookedSlotsController bookedSlotsController;

    @BeforeEach
    public void setUp(){
        addBookedSlots = new BookedSlots(
                "",
                "mocktagmember@mock.com",
                "Mock Tag Member",
                "Tag Mocked",
                "" + (new Date()),
                "",
                "",
                "",
                "Java Backend",
                "We are looking for an experienced Back-end developer to join our IT team." +
                        "You will be responsible for the server side of our web applications.",
                "",
                "",
                "UPCOMING"
        );
        updateBookedSlots = new BookedSlots(
                "",
                "mocktagmember@mock.com",
                "Mock Tag Member",
                "Tag Mocked",
                "" + (new Date()),
                "" + (new Date(2022, 05, 07)),
                "" + (new Time(14, 30, 00)),
                "" + (new Time(15, 30, 00)),
                "Java Backend",
                "We are looking for an experienced Back-end developer to join our IT team." +
                        "You will be responsible for the server side of our web applications.",
                "Mock Interviewer",
                "mockinterviewer@mock.com",
                "BOOKED"
        );
        mockMvc = MockMvcBuilders.standaloneSetup(bookedSlotsController).build();
    }

    @AfterEach
    public void TearDown(){
        addBookedSlots = null;
        updateBookedSlots = null;
    }

    @Test
    void testNewBookedSlot() throws Exception {
        when(bookedSlotsServiceImpl.createSlot(addBookedSlots)).thenReturn(addBookedSlots);
        mockMvc.perform(post("/api/v1/bookedSlot")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(addBookedSlots)))
                .andExpect(status().isCreated());
        verify(bookedSlotsServiceImpl, times(1)).createSlot(addBookedSlots);
    }

    @Test
    void shouldFailWhenSlotAlreadyPresent() throws Exception {
        when(bookedSlotsController.newBookedSlot(addBookedSlots)).thenThrow(new SlotAlreadyExistsException());
        mockMvc.perform(post("/api/v1/bookedSlot")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(addBookedSlots)))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetBookedSlotsTagTeam() throws Exception {
        List<BookedSlots> bookedSlots = new ArrayList<>();
        bookedSlots.add(addBookedSlots);
        Mockito.lenient().when(bookedSlotsService.getSlotsForTagMemberEmailId(any())).thenReturn(bookedSlots);
        mockMvc.perform(get("/api/v1/tag/mocktagmember@mock.com")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void testGetBookedSlotsInterviewer() throws Exception {
        List<BookedSlots> bookedSlots = new ArrayList<>();
        bookedSlots.add(addBookedSlots);
        Mockito.lenient().when(bookedSlotsService.getSlotsForInterviewerEmailId("mockinterviewer@mock.com")).thenReturn(bookedSlots);
        mockMvc.perform(get("/api/v1/mockinterviewer@mock.com")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    public static String asJsonString(final Object obj){
        try{
            return new ObjectMapper().writeValueAsString(obj);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}
