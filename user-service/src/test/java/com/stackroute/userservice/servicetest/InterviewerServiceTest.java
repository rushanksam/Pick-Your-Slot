package com.stackroute.userservice.servicetest;

import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.InterviewerProfile;
import com.stackroute.userservice.repository.InterviewerRepository;
import com.stackroute.userservice.service.InterviewerServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class InterviewerServiceTest {

    @Mock
    private InterviewerRepository interviewerRepository;
    @InjectMocks
    private InterviewerServiceImpl interviewerServiceimpl;
    private InterviewerProfile interviewerProfile,updatedProfile;
    @BeforeEach
    public void setUp()
    {

        interviewerProfile=new InterviewerProfile("suresh.mogili@gl.com","suresh","suresh0332","image","7430975467","java fullstack",2.5,"chennai","i am so and so");
        updatedProfile = new InterviewerProfile("mogili.kumar@gl.com","suresh mogili","suresh0332","image","8886720726","java fullstack",2.0,"hyd","i am so and so");
    }
    @AfterEach
    public void TearDown()
    {
        interviewerProfile=null;
    }

    @Test
     public void saveInterviewerProfileTest() throws UserProfileAlreadyExits {
        Mockito.when(interviewerRepository.save(interviewerProfile)).thenReturn((interviewerProfile));
        assertEquals(interviewerProfile,interviewerServiceimpl.saveInterviewerProfile(interviewerProfile));
    }
    @Test
    public void findbyInterviewerEmailIdTest() throws NoProfileFoundException {
        Mockito.when(interviewerRepository.findById(interviewerProfile.getInterviewerEmailId())).thenReturn(Optional.of(interviewerProfile));
        assertEquals(Optional.of(interviewerProfile),interviewerServiceimpl.findByInterviewerEmailId(interviewerProfile.getInterviewerEmailId()));
    }

    @Test
    public void updateInterviewerProfileTest() throws UserProfileAlreadyExits, NoProfileFoundException {
        Mockito.when(interviewerRepository.existsById(updatedProfile.getInterviewerEmailId())).thenReturn((true));
        Mockito.when(interviewerRepository.save(updatedProfile)).thenReturn((updatedProfile));
        assertEquals(updatedProfile,interviewerServiceimpl.updateInterviewerProfile(updatedProfile));
    }
}
