
package com.stackroute.userservice.controllertest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.controller.UserServiceController;
import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.*;
import com.stackroute.userservice.service.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//need to update
import java.util.Optional;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockRestServiceServer
public class UserServiceControllerTest {
    @Mock
    private InterviewerService interviewerService;
    @Mock
    private TagTeamService tagTeamService;

    private InterviewerProfile interviewerprofile,intupdatedProfile;
    private TagTeamProfile tagTeamProfile,tagupdatedProfile;
    private  MockMvc mockMvc;

    @InjectMocks
    private UserServiceController userServiceController;
    @BeforeEach
    public void setUp()
    {
        mockMvc= MockMvcBuilders.standaloneSetup(userServiceController).build();
        interviewerprofile=new InterviewerProfile("suresh.mogili@gl.com","suresh","suresh0332","image","7430975467","java fullstack",2.5,"chennai","i am so and so");
        intupdatedProfile = new InterviewerProfile("mogili.kumar@gl.com","suresh mogili","suresh0332","image","8886720726","java fullstack",2.0,"hyd","i am so and so");

        tagTeamProfile=new TagTeamProfile("tag.mahesh@gl.com","javaTR","mahesh0332","98726872","image","737326329823",2.5,"chennai","i am so and so");
        tagupdatedProfile = new TagTeamProfile("tagup.mahesh@gl.com","javaTR","mahesh0452","98726872","image","73732446523",4.5,"vijayawada","i am so and so");
    }

    @AfterEach
    public void TearDown() {
        interviewerprofile = null;
        tagTeamProfile = null;
    }

    @Test
    public void getInterviewerByIdTest_Success()throws Exception
    {
        Mockito.when(interviewerService.findByInterviewerEmailId(any())).thenReturn(Optional.of(interviewerprofile));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/interviewer/"+interviewerprofile.getInterviewerEmailId())
                ).andExpect(status().isOk());
       // assertEquals(new ResponseEntity<InterviewerProfile>(HttpStatus.OK),userServiceController.saveInterviewerProfile(interviewerprofile));

    }
    @Test
    public void saveInterviewerProfileTest_Success()throws Exception
    {
        Mockito.when(interviewerService.saveInterviewerProfile(interviewerprofile)).thenReturn(interviewerprofile);
        mockMvc.perform(post("/api/v1/interviewerProfile").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(interviewerprofile))
        ).andExpect(status().isCreated());

    }
    @Test
    public void updateInterviewerProfileTest_Success()throws Exception
    {

        mockMvc.perform(patch("/api/v1/updateProfile").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(interviewerprofile))
        ).andExpect(status().isAccepted());
    }
    @Test
    public void saveTagTeamProfileTest_Success()throws Exception
    {
        Mockito.when(tagTeamService.saveTagteamProfile(tagTeamProfile)).thenReturn(tagTeamProfile);
        mockMvc.perform(post("/api/v1/tagTeam").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(tagTeamProfile))
        ).andExpect(status().isCreated());

    }

    @Test
    public void getTagTeamProfileTest_Success()throws Exception
    {
        Mockito.when(tagTeamService.findByTagMemberEmailId(any())).thenReturn(Optional.of(tagTeamProfile));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tagTeam/"+tagTeamProfile.getTagMemberEmailId())
        ).andExpect(status().isOk());

    }
    @Test
    public void updateTagTeamProfileTest_Success()throws Exception
    {

        mockMvc.perform(patch("/api/v1/updateTagTeam").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(tagTeamProfile))
        ).andExpect(status().isAccepted());

    }
  /*  @Test
    public void getInterviewerByIdTest_Fail() throws Exception,NoProfileFoundException
    {
       // Mockito.when(interviewerService.findByInterviewerEmailId(interviewerprofile.getInterviewerEmailId())).thenReturn(throw new NoProfileFoundException());
        mockMvc.perform(MockMvcRequestBuilders.get("/interviewer/"+interviewerprofile.getInterviewerEmailId()).contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk()).andExpect((ResultMatcher) jsonPath("$.interviewerName",is("suresh")));
        //assertEquals(new ResponseEntity<InterviewerProfile>(HttpStatus.NOT_FOUND),userServiceController.saveInterviewerProfile(interviewerprofile));

    }*/
    public static String asJsonString(final Object obj){
        try{
            return new ObjectMapper().writeValueAsString(obj);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}

