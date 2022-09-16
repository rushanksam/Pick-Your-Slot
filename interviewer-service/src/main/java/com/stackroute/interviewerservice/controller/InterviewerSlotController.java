package com.stackroute.interviewerservice.controller;

import com.stackroute.interviewerservice.exception.InterviewerSlotAlreadyFound;
import com.stackroute.interviewerservice.exception.InterviewerSlotNotFound;
import com.stackroute.interviewerservice.model.InterviewerSlots;
import com.stackroute.interviewerservice.model.SlotStatus;
import com.stackroute.interviewerservice.service.InterviewerSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
@CrossOrigin
public class InterviewerSlotController {

    @Autowired
    InterviewerSlotService interviewerSlotService;
    @PostMapping("/newSlot")
    public ResponseEntity<?> newInterviewerSlots(@RequestBody InterviewerSlots interviewerSlots) {
        try {
            InterviewerSlots intprofile = interviewerSlotService.newInterviewerSlot(interviewerSlots);
            return new ResponseEntity<>(intprofile, HttpStatus.CREATED);
        }
        catch (InterviewerSlotAlreadyFound e)
        {
            return new ResponseEntity<>("Slot Already Reported",HttpStatus.ALREADY_REPORTED);

        }
        catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateSlot")
    public ResponseEntity<?> updateInterviewerSlots(@RequestBody InterviewerSlots interviewerSlots) {
       try {
           return new ResponseEntity<>(interviewerSlotService.updateInterviewerSlot(interviewerSlots),HttpStatus.ACCEPTED);
        }
       catch (InterviewerSlotNotFound e) {
           return  new ResponseEntity<>("Slot Not Found",HttpStatus.NOT_FOUND);
       }
       catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @DeleteMapping("/{slotId}")
    public ResponseEntity<?> deleteInterviewerSlots(@PathVariable String slotId) {
        try {
            return new ResponseEntity<>(interviewerSlotService.deleteInterviewerSlot(slotId),HttpStatus.ACCEPTED);
        }
        catch (InterviewerSlotNotFound e) {
            return  new ResponseEntity<>("Slot Not Found",HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/techTrack/{teckTrack}")
    public ResponseEntity<List<InterviewerSlots>> allslotsBasedOnTeckTrack(@PathVariable String teckTrack) {
         try {
             List<InterviewerSlots> slotsList=interviewerSlotService.allSlotsBasedOnTechTracks(teckTrack);
             return new ResponseEntity<>(slotsList,HttpStatus.FOUND);
             }
         catch (Exception e) {
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }

    @GetMapping("/{emailId}")
    public ResponseEntity<List<InterviewerSlots>> allslotsBasedOnEmailId(@PathVariable String emailId) {

        try {
            List<InterviewerSlots> slotsList = interviewerSlotService.allSlotsBasedOnEmailId(emailId);
            return new ResponseEntity<>(slotsList, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/availableSlot/{emailId}")
    public ResponseEntity<List<InterviewerSlots>> getAvailableSlot(@PathVariable String emailId){
        try{
            return new ResponseEntity<>(interviewerSlotService.allSlotsBasedOnEmailIdAndSlotStatus(emailId, "Available"), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/interviewer/{year}/{month}")
    public ResponseEntity<Map> getAllBookedSlotsInterviewer(@PathVariable String month, @PathVariable String year) throws Exception {
        //09-Apr-2022
        ResponseEntity responseEntity;
        int alllist = 0;
        int bookedSlotsList = 0;
        SimpleDateFormat inputFormat = new SimpleDateFormat("MMM");
        Calendar cal = Calendar.getInstance();
        cal.setTime(inputFormat.parse(month));
        SimpleDateFormat outputFormat = new SimpleDateFormat("M");
        String tempDate=outputFormat.format(cal.getTime())+"-"+year;
        Map slotMap= new HashMap<>();
        try {
            List<InterviewerSlots> allslots=interviewerSlotService.getAllSlots();
            for (InterviewerSlots bslot : allslots) {
                if (bslot.getSlotDate().contains(tempDate)) {
                    alllist++;
                    if (bslot.getSlotStatus().equals(SlotStatus.Booked)) {
                        bookedSlotsList++;
                    }
                }
            }

            slotMap.put("alllist",alllist);
            slotMap.put("bookedslot",bookedSlotsList);
            slotMap.put("notbooked",alllist-bookedSlotsList);
            responseEntity= new ResponseEntity<>(slotMap,HttpStatus.OK);
        }
        catch (InterviewerSlotNotFound e){
            responseEntity = new ResponseEntity<>("No slots found!", HttpStatus.NOT_FOUND);
            throw new InterviewerSlotNotFound();
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>("No slots found!", HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }
}
