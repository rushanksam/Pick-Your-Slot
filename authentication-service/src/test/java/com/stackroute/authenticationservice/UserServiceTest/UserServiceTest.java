/**
 * @author mohitraghuvanshi
 * Date 19/04/22
 **/
package com.stackroute.authenticationservice.UserServiceTest;

import com.stackroute.authenticationservice.exception.UserAlreadyPresentException;
import com.stackroute.authenticationservice.exception.UserIsDisabledException;
import com.stackroute.authenticationservice.exception.UserNotPresentException;
import com.stackroute.authenticationservice.exception.WrongCredentialsException;
import com.stackroute.authenticationservice.model.LoginCredentials;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.repository.UserRepository;
import com.stackroute.authenticationservice.service.UserService;
import com.stackroute.authenticationservice.utility.JwtUtility;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = UserServiceTest.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;
    @Mock
    JwtUtility jwtUtility;
    @InjectMocks
    UserService userService;
    private User userData, wrongUserData;
    private LoginCredentials loginCredentials;

    @BeforeEach
    public void setUp(){
        userData = new User(
                "mohit.raghuwanshi@gmail.com",
                "Mohit@Password",
                "TAG_TEAM");
        loginCredentials = new LoginCredentials(
                "mohit.raghuwanshi@gmail.com",
                "Mohit@Password"
        );
        wrongUserData = new User(
                "mohitt.raghuwanshi@gmail.com",
                "Mohit123@Password",
                "TAG_TEAM");
    }
    @AfterEach
    public void tearDown(){
        userData = null;
    }
    @Test
    public void testCreateNewUser() throws UserAlreadyPresentException {
        when(userRepository.save(userData)).thenReturn(userData);
        assertEquals(userData, userService.createNewUser(userData));
        verify(userRepository, times(1)).save(userData);
    }

    @Test
    public void shouldFailWhenUserAlreadyExists() throws UserAlreadyPresentException {
        when(userRepository.existsById(userData.getUserEmailId())).thenReturn(Boolean.FALSE);
        userService.createNewUser(userData);
        verify(userRepository, times(1)).save(userData);
    }
    @Test
    public void testVerifyUser() throws UserIsDisabledException, WrongCredentialsException, UserNotPresentException {
        when(userRepository.findByUserEmailIdAndUserPassword(loginCredentials.getUserEmailId(), loginCredentials.getUserPassword())).thenReturn(userData);
        assertNotNull(userService.verifyUser(loginCredentials).values());
        verify(userRepository, times(1)).findByUserEmailIdAndUserPassword(loginCredentials.getUserEmailId(), loginCredentials.getUserPassword());
    }
    @Test
    public void shouldFailWhenWrongCredentials() throws WrongCredentialsException, UserIsDisabledException, UserNotPresentException {
        when(userRepository.findByUserEmailIdAndUserPassword(loginCredentials.getUserEmailId(),
                loginCredentials.getUserPassword())).thenReturn(wrongUserData);
        assertEquals(0,userService.verifyUser(loginCredentials).size());
        verify(userRepository, times(1)).findByUserEmailIdAndUserPassword(loginCredentials.getUserEmailId(), loginCredentials.getUserPassword());
    }
}