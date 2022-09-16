package com.stackroute.userservice.servicetest;

import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.TagTeamProfile;
import com.stackroute.userservice.repository.TagTeamRepository;
import com.stackroute.userservice.service.TagTeamServiceImpl;
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
public class TagTeamServiceTest {
    @Mock
    private TagTeamRepository tagTeamRepository;
    @InjectMocks
    private TagTeamServiceImpl tagTeamServiceImpl;
    private TagTeamProfile tagTeamProfile,updatedProfile;
    @BeforeEach
    public void setUp()
    {

        tagTeamProfile=new TagTeamProfile("tag.mahesh@gl.com","javaTR","mahesh0332","98726872","image","737326329823",2.5,"chennai","i am so and so");
        updatedProfile = new TagTeamProfile("tagup.mahesh@gl.com","javaTR","mahesh0452","98726872","image","73732446523",4.5,"vijayawada","i am so and so");
    }
    @AfterEach
    public void TearDown()
    {
        tagTeamProfile=null;
    }

    @Test
    public void saveInterviewerProfileTest() throws UserProfileAlreadyExits {
        Mockito.when(tagTeamRepository.save(tagTeamProfile)).thenReturn((tagTeamProfile));
        assertEquals(tagTeamProfile,tagTeamServiceImpl.saveTagteamProfile(tagTeamProfile));
    }
    @Test
    public void findbyInterviewerEmailIdTest() throws NoProfileFoundException {
        Mockito.when(tagTeamRepository.findById(tagTeamProfile.getTagMemberEmailId())).thenReturn(Optional.of(tagTeamProfile));
        assertEquals(Optional.of(tagTeamProfile),tagTeamServiceImpl.findByTagMemberEmailId(tagTeamProfile.getTagMemberEmailId()));
    }

    @Test
    public void updateInterviewerProfile() throws UserProfileAlreadyExits, NoProfileFoundException {
        Mockito.when(tagTeamRepository.existsById(updatedProfile.getTagMemberEmailId())).thenReturn((true));
        Mockito.when(tagTeamRepository.save(updatedProfile)).thenReturn((updatedProfile));
        assertEquals(updatedProfile,tagTeamServiceImpl.updateTagTeamProfile(updatedProfile));
    }
}

