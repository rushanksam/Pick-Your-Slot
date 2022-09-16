/**
 * @author mohitraghuvanshi
 * Date 22/04/22
 **/
package com.stackroute.tagservice.controller;

import com.stackroute.tagservice.exception.NoSlotFoundException;
import com.stackroute.tagservice.exception.SlotAlreadyExistsException;
import com.stackroute.tagservice.model.BookedSlots;
import com.stackroute.tagservice.service.BookedSlotsServiceImpl;
import io.swagger.models.auth.In;
import org.springframework.data.mongodb.core.aggregation.BooleanOperators;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class BookedSlotsController {

    private BookedSlotsServiceImpl bookedSlotsService;
    private ResponseEntity responseEntity;
    private Date date;
    /**
     *<h1>Autowired Constructor</h1>
     * @param bookedSlotsService
     * Constructor for BookedSlotsController
     * Assigning the objects
     * Autowired the components
     */
    public BookedSlotsController(BookedSlotsServiceImpl bookedSlotsService) {
        this.bookedSlotsService = bookedSlotsService;
    }

    /**
     * <h1>Method to Create New Slot</h1>
     * This method will create new slot for interview by TAG Team
     * @param bookedSlots
     * bookedSlots object will contain all the data being sent by POST Mapping
     */
    @PostMapping("/bookedSlot")
    public ResponseEntity<?> newBookedSlot(@RequestBody BookedSlots bookedSlots){
        try{
            if(bookedSlots != null){
                bookedSlotsService.createSlot(bookedSlots);
                responseEntity = new ResponseEntity<>("Slot Created Successfully.", HttpStatus.CREATED);
            }else{
                responseEntity = new ResponseEntity<>("Error in creating slot.", HttpStatus.CONFLICT);
            }
        }catch(SlotAlreadyExistsException e){
            responseEntity = new ResponseEntity<>("Invalid Slot Details Entered!", HttpStatus.NO_CONTENT);
        }
        return responseEntity;
    }

    /**
     * <h1>Method to Update Existing SLots</h1>
     * @param bookedSlots
     */
    @PutMapping("/updateBookedSlot")
    public ResponseEntity<?> updateBookedSlot(@RequestBody BookedSlots bookedSlots) throws NoSlotFoundException {
        try{
            responseEntity = new ResponseEntity<>(bookedSlotsService.updateBookedSlot(bookedSlots), HttpStatus.OK);
        } catch (NoSlotFoundException e) {
            responseEntity = new ResponseEntity<>("No slot found!", HttpStatus.NOT_FOUND);
            throw new NoSlotFoundException();
        }
        return responseEntity;
    }

    @GetMapping("/tag/{tagMemberEmailId}")
    public ResponseEntity<?> getBookedSlotsTagTeam(@PathVariable String tagMemberEmailId) throws NoSlotFoundException {
        try{
            responseEntity = new ResponseEntity<>(bookedSlotsService.getSlotsForTagMemberEmailId(tagMemberEmailId), HttpStatus.OK);
        }catch (NoSlotFoundException e){
            responseEntity = new ResponseEntity<>("No slots found!", HttpStatus.NOT_FOUND);
            throw new NoSlotFoundException();
        }
        return responseEntity;
    }

    @GetMapping("/{interviewerEmailId}")
    public ResponseEntity getBookedSlotsInterviewer(@PathVariable String interviewerEmailId) throws NoSlotFoundException {
        try{
            responseEntity = new ResponseEntity<>(bookedSlotsService.getSlotsForInterviewerEmailId(interviewerEmailId), HttpStatus.OK);
        }catch (NoSlotFoundException e){
            responseEntity = new ResponseEntity<>("No slots found!", HttpStatus.NOT_FOUND);
            throw new NoSlotFoundException();
        }catch (Exception e){
            responseEntity = new ResponseEntity<>("No slots found!", HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }
    @GetMapping("/tag/{year}/{month}/{tagTeam}")
    public ResponseEntity<Integer> getAllBookedSlotsInterviewer(@PathVariable String tagTeam,@PathVariable String month,@PathVariable String year) throws Exception {
        //09-Apr-2022
        int availblelist = 0;
        SimpleDateFormat inputFormat = new SimpleDateFormat("MMM");
        Calendar cal = Calendar.getInstance();
        cal.setTime(inputFormat.parse(month));
        SimpleDateFormat outputFormat = new SimpleDateFormat("M");
        String tempDate=outputFormat.format(cal.getTime())+"-"+year;
        try {
            List<BookedSlots> allslots=bookedSlotsService.getAllSlots();
            for (BookedSlots bslot : allslots) {

                if (bslot.getSlotDate().contains(tempDate)) {
                        if (bslot.getSlotStatus().equals("Booked")) {
                            if (bslot.getTagTeamName().equals(tagTeam)) {
                                availblelist++;
                            }
                        }
                    }
                }
            responseEntity = new ResponseEntity<>(availblelist,HttpStatus.OK);
        }
        catch (NoSlotFoundException e){
            responseEntity = new ResponseEntity<>("No slots found!", HttpStatus.NOT_FOUND);
            throw new NoSlotFoundException();
        }catch (Exception e){
            responseEntity = new ResponseEntity<>("No slots found!", HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }
}