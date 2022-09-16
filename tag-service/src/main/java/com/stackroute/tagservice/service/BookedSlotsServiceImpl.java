/**
 * @author mohitraghuvanshi
 * Date 22/04/22
 **/
package com.stackroute.tagservice.service;

import com.stackroute.tagservice.producer.Producer;
import com.stackroute.tagservice.exception.NoSlotFoundException;
import com.stackroute.tagservice.exception.SlotAlreadyExistsException;
import com.stackroute.tagservice.model.BookedSlots;
import com.stackroute.tagservice.repository.BookedSlotsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BookedSlotsServiceImpl implements BookedSlotsService {

    private BookedSlotsRepository bookedSlotsRepository;
    @Autowired
    private Producer producer;

    @Autowired
    public BookedSlotsServiceImpl(BookedSlotsRepository bookedSlotsRepository) {
        this.bookedSlotsRepository = bookedSlotsRepository;
    }

    public BookedSlots createSlot(BookedSlots bookedSlots) throws SlotAlreadyExistsException {
        BookedSlots bookedSlots1 = new BookedSlots();
        if(!(bookedSlotsRepository.existsById(bookedSlots.getBookedSlotId()))) {
                UUID uuid = UUID.randomUUID();
                bookedSlots.setBookedSlotId("slot_" + uuid);
                producer.sendRabbitMQMessage(bookedSlots, bookedSlots.getTagMemberName());
                return bookedSlotsRepository.save(bookedSlots);
        }
        throw new SlotAlreadyExistsException();
    }

    public BookedSlots updateBookedSlot(BookedSlots bookedSlots) throws NoSlotFoundException {
        if(bookedSlotsRepository.findById(bookedSlots.getBookedSlotId()).isEmpty()){
            throw new NoSlotFoundException();
        }
        return bookedSlotsRepository.save(bookedSlots);
    }

    public List<BookedSlots> getSlotsForTagMemberEmailId(String tagEmailId) throws NoSlotFoundException {
        List<BookedSlots> bookedSlots = bookedSlotsRepository.findByTagMemberEmailId(tagEmailId);
        if(bookedSlots.isEmpty()){
            throw new NoSlotFoundException();
        }
        return bookedSlots;
    }

    public List<BookedSlots> getSlotsForInterviewerEmailId(String interviewerEmailId) throws NoSlotFoundException {
        List<BookedSlots> bookedSlots =bookedSlotsRepository.findByInterviewerEmailId(interviewerEmailId);
        if(bookedSlots.isEmpty()){
            throw new NoSlotFoundException();
        }
        return bookedSlots;
    }

    @Override
    public List<BookedSlots> getAllSlotsByTagTeamName(String tagTeamName) throws NoSlotFoundException {
        List<BookedSlots> bookedSlots =bookedSlotsRepository.findByTagTeamName(tagTeamName);
        if(bookedSlots.isEmpty()){
            throw new NoSlotFoundException();
        }
        return bookedSlots;
    }
    @Override
    public List<BookedSlots> getAllSlots() throws NoSlotFoundException {
        List<BookedSlots> bookedSlots =bookedSlotsRepository.findAll();
        if(bookedSlots.isEmpty()){
            throw new NoSlotFoundException();
        }
        return bookedSlots;
    }
}
