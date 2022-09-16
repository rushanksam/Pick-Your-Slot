package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.InterviewerProfile;
import com.stackroute.userservice.repository.InterviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewerServiceImpl implements InterviewerService{


   @Autowired
   private InterviewerRepository interviewerRepository;

    /**
     *
      * @param profile
     * @return
     */
   @Override
    public InterviewerProfile saveInterviewerProfile(InterviewerProfile profile) throws UserProfileAlreadyExits {
        Optional<InterviewerProfile> optProfile= interviewerRepository.findById(profile.getInterviewerEmailId());
            if (optProfile.isPresent())
                throw new UserProfileAlreadyExits();
            return interviewerRepository.save(profile);

    }

    /**
     *
     * @param email
     * @return
     * @throws NoProfileFoundException
     */
    public Optional<InterviewerProfile> findByInterviewerEmailId(String email) throws NoProfileFoundException {
        Optional<InterviewerProfile> optProfile= interviewerRepository.findById(email);
        if(optProfile.isEmpty())
            throw new NoProfileFoundException();
        return optProfile;
    }

    /**
     *
     * @param profile
     * @return
     */
    @Override
    public InterviewerProfile updateInterviewerProfile(InterviewerProfile profile) throws NoProfileFoundException {
       if(interviewerRepository.existsById(profile.getInterviewerEmailId()))
       {
           return interviewerRepository.save(profile);
       }
       else {
           throw new NoProfileFoundException();
       }
    }

    @Override
    public List<InterviewerProfile> getInterviewerByTechTrack(String techTrack){
        return interviewerRepository.findByTechTrack(techTrack);
    }
}
