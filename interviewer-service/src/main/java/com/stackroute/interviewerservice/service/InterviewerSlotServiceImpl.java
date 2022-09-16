package com.stackroute.interviewerservice.service;

import com.stackroute.interviewerservice.exception.InterviewerSlotAlreadyFound;
import com.stackroute.interviewerservice.exception.InterviewerSlotNotFound;
import com.stackroute.interviewerservice.model.InterviewerSlots;
import com.stackroute.interviewerservice.repository.InterviewerSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InterviewerSlotServiceImpl implements InterviewerSlotService{

    @Autowired
    InterviewerSlotRepository interviewerSlotRepository;

    @Override
    public InterviewerSlots newInterviewerSlot(InterviewerSlots interviewerSlots) throws InterviewerSlotAlreadyFound {
        if(interviewerSlotRepository.existsById(interviewerSlots.getSlotId()))
            throw new InterviewerSlotAlreadyFound();
        else  {
           List <InterviewerSlots> interviewerSlots1 = interviewerSlotRepository.findByemailId(interviewerSlots.getEmailId());
           for(InterviewerSlots interviewerSlots2 : interviewerSlots1){
               if(interviewerSlots2.getSlotDate().equals(interviewerSlots.getSlotDate())){
                   if(interviewerSlots2.getStartTime().equals(interviewerSlots.getStartTime()))
                       throw new InterviewerSlotAlreadyFound();
               }
           }
            UUID uuid=UUID.randomUUID();
            interviewerSlots.setSlotId("slot_"+ uuid);
            return interviewerSlotRepository.save(interviewerSlots);
        }
    }

    @Override
    public InterviewerSlots updateInterviewerSlot(InterviewerSlots interviewerSlots) throws InterviewerSlotNotFound {
       if(interviewerSlotRepository.existsById(interviewerSlots.getSlotId()))
        return interviewerSlotRepository.save(interviewerSlots);
       else
           throw new InterviewerSlotNotFound();
    }

    @Override
    public List<InterviewerSlots> allSlotsBasedOnTechTracks(String techTrack) {
        return interviewerSlotRepository.findBytechTrack(techTrack);
    }

    @Override
    public List<InterviewerSlots> allSlotsBasedOnEmailId(String emailID) {
        return interviewerSlotRepository.findByemailId(emailID);
    }

    @Override
    public List<InterviewerSlots> allSlotsBasedOnEmailIdAndSlotStatus(String emailID, String slotStatus) {
        return interviewerSlotRepository.findByEmailIdAndSlotStatus(emailID, slotStatus);
    }

    @Override
    public Boolean deleteInterviewerSlot(String slotId) throws InterviewerSlotNotFound {
        if (interviewerSlotRepository.existsById(slotId)){
            interviewerSlotRepository.deleteById(slotId);
            return true;
        }
        throw new InterviewerSlotNotFound();
    }

    @Override
    public List<InterviewerSlots> getAllSlots() throws InterviewerSlotNotFound {
        List<InterviewerSlots>interviewerSlots=  interviewerSlotRepository.findAll();
        if(interviewerSlots.isEmpty()){
            throw new InterviewerSlotNotFound();
        }
        return interviewerSlots;
    }
}
