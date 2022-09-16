package com.stackroute.userservice.controller;

import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.*;
import com.stackroute.userservice.service.InterviewerService;
import com.stackroute.userservice.service.TagTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController()
@CrossOrigin()
@RequestMapping("api/v1")
public class UserServiceController {
     private InterviewerService interviewerService;
     private TagTeamService tagTeamService;

    /**
     *
     * @param interviewerService,tagTeamService
     * Constructor for UserServiceController
     * Assigning the local variable
     * Autowired the components
     */
    @Autowired
    public UserServiceController(InterviewerService interviewerService, TagTeamService tagTeamService) {
        this.interviewerService = interviewerService;
        this.tagTeamService = tagTeamService;
    }

    /**
     *
     * @return ResponseEntity<InterviewProfile>
     * @throws NoProfileFoundException
     */
    @GetMapping("/interviewer/{email}")
    public ResponseEntity<InterviewerProfile> getInterviewerProfile(@PathVariable String email) throws NoProfileFoundException {
        Optional<InterviewerProfile> optInterviewerProfile=interviewerService.findByInterviewerEmailId(email);
        return optInterviewerProfile.map(interviewerProfile -> new ResponseEntity<>(interviewerProfile, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/interviewerProfile")
    public ResponseEntity<InterviewerProfile> saveInterviewerProfile(@RequestBody InterviewerProfile interviewerProfile)
    {
        try {
            InterviewerProfile intprofile = interviewerService.saveInterviewerProfile(interviewerProfile);
            return new ResponseEntity<>(intprofile, HttpStatus.CREATED);
        }
        catch (UserProfileAlreadyExits e)
        {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @param interviewerProfile
     */
    @PatchMapping("/updateProfile")
    public ResponseEntity<InterviewerProfile>updateInterviewerProfile(@RequestBody InterviewerProfile interviewerProfile)
    {
        try{
             return new ResponseEntity<>(interviewerService.updateInterviewerProfile(interviewerProfile),HttpStatus.ACCEPTED);
         }
        catch (NoProfileFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    /**
     *
     * @param tagTeamProfile
     * @return ResponseEntity<TagTeamProfile>  with http Status Created/internal Server Error
     */
    @PostMapping("/tagTeam")
    public ResponseEntity<TagTeamProfile> saveTagTeamProfile(@RequestBody TagTeamProfile tagTeamProfile)
    {
        try {
            TagTeamProfile tagprofile=tagTeamService.saveTagteamProfile(tagTeamProfile);
            return new ResponseEntity<>(tagprofile, HttpStatus.CREATED);
        }
        catch (UserProfileAlreadyExits e)
        {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @return ResponseEntity<TagTeamProfile> with http Status
     * @throws NoProfileFoundException
     */
    @GetMapping("/tagTeam/{email}")
    public ResponseEntity<TagTeamProfile> getTagTeamProfile(@PathVariable String email) throws NoProfileFoundException {
        Optional<TagTeamProfile> optTagProfile=tagTeamService.findByTagMemberEmailId(email);
        return optTagProfile.map(tagTeamProfilem-> new ResponseEntity<>(tagTeamProfilem,HttpStatus.OK)).orElseGet(()->new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     *
     * @return ResponseEntity<TagTeamProfile> with http Status
     */
    @PatchMapping("/updateTagTeam")
    public ResponseEntity<TagTeamProfile> updateTagTeamProfile(@RequestBody TagTeamProfile tagTeamProfile)
    {
        try {
        return new ResponseEntity<>(tagTeamService.updateTagTeamProfile(tagTeamProfile),HttpStatus.ACCEPTED);
        }
       catch (NoProfileFoundException e){
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
    }

    @GetMapping("/techTrack/{techTrack}")
    public ResponseEntity<List<InterviewerProfile>> getInterviewerByTechTrack(@PathVariable String techTrack) {
        try {
            List<InterviewerProfile> slotsList = interviewerService.getInterviewerByTechTrack(techTrack);
            return new ResponseEntity<>(slotsList,HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
