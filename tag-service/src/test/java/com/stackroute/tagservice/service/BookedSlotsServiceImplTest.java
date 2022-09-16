/**
 * @author mohitraghuvanshi
 * Date 27/04/22
 **/
package com.stackroute.tagservice.service;

import com.stackroute.tagservice.exception.NoSlotFoundException;
import com.stackroute.tagservice.exception.SlotAlreadyExistsException;
import com.stackroute.tagservice.model.BookedSlots;
import com.stackroute.tagservice.producer.Producer;
import com.stackroute.tagservice.repository.BookedSlotsRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Time;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class BookedSlotsServiceImplTest {

    @Mock
    private BookedSlotsRepository bookedSlotsRepository;

    @InjectMocks
    private BookedSlotsServiceImpl bookedSlotsService;
    @InjectMocks
    private BookedSlots addBookedSlots, updateBookedSlots;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(){
        addBookedSlots = new BookedSlots(
                "slot_b277d32",
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
                "slot_b277d33",
                "mocktagmember@mock.com",
                "Mock Tag Member",
                "Tag Mocked",
                "" + (new Date(2022, 04, 29)),
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
        mockMvc= MockMvcBuilders.standaloneSetup(bookedSlotsService).build();
    }

    @AfterEach
    public void TearDown(){
        addBookedSlots = null;
    }

//    @Test
//    public void testSaveBookedSlot() throws SlotAlreadyExistsException {
//        when(bookedSlotsRepository.save(addBookedSlots)).thenReturn(addBookedSlots);
//        doNothing().when(producer.sendRabbitMQMessage(addBookedSlots, addBookedSlots.getTagMemberName()));
//        assertEquals(addBookedSlots, bookedSlotsService.createSlot(addBookedSlots));
//        verify(bookedSlotsRepository, times(1)).save(addBookedSlots);
//    }

    @Test
    public void testUpdateBookedSlot(){
        when(bookedSlotsRepository.findById(updateBookedSlots.getBookedSlotId())).thenReturn(Optional.ofNullable(updateBookedSlots));
        when(bookedSlotsRepository.save(updateBookedSlots)).thenReturn(updateBookedSlots);
        assertEquals(updateBookedSlots, bookedSlotsRepository.save(updateBookedSlots));
        //verify(bookedSlotsRepository, times(1));
    }

    @Test
    public void testGetSlotsForTagMemberEmailId() throws NoSlotFoundException, NullPointerException {
        List<BookedSlots> bookedSlots = new ArrayList<>();
        bookedSlots.add(addBookedSlots);
        when(bookedSlotsRepository.findByTagMemberEmailId(updateBookedSlots.getTagMemberEmailId())).thenReturn(bookedSlots);
        assertNotNull(bookedSlotsService.getSlotsForTagMemberEmailId(updateBookedSlots.getTagMemberEmailId()));
    }

}
