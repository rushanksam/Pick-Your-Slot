/**
 * @author mohitraghuvanshi
 * Date 20/04/22
 **/
package com.stackroute.authenticationservice.UserControllerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.authenticationservice.controller.UserController;
import com.stackroute.authenticationservice.exception.UserAlreadyPresentException;
import com.stackroute.authenticationservice.model.LoginCredentials;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.repository.UserRepository;
import com.stackroute.authenticationservice.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @InjectMocks
    UserController userController;

    @Mock
    UserService userService;

    @Mock
    UserRepository userRepository;

    @Autowired
    MockMvc mockMvc;

    private User userData, wrongUserData;
    private LoginCredentials loginCredentials, wrongLoginCredentials;

    @BeforeEach
    public void setUp(){
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        userData = new User(
                "mohit.raghuwanshi@gmail.com",
                "Mohit@Password",
                "TAG_TEAM");
        loginCredentials = new LoginCredentials(
                "mohit.raghuwanshi@gmail.com",
                "Mohit@Password");
        wrongUserData = new User(
                "mohit.raghuwanshi@gmail.com",
                "Mohit123@Password",
                "TAG_TEAM");
        wrongLoginCredentials = new LoginCredentials(
                "abc@gmail.com",
                "Abc@Password");
    }

    @AfterEach
    public void tearDown(){
        userData = null;
    }

    @Test
    void testCreateNewUser() throws Exception {
        when(userService.createNewUser(userData)).thenReturn(userData);
        mockMvc.perform(post("/api/v1")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(userData)))
                .andExpect(status().isCreated());
        verify(userService, times(1)).createNewUser(userData);
    }

    @Test
    void shouldFailWhenUserAlreadyPresent() throws Exception {
        when(userService.createNewUser(userData)).thenThrow(new UserAlreadyPresentException());
        mockMvc.perform(post("/api/v1")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(userData)))
                        .andExpect(status().isConflict());
        verify(userService, times(1)).createNewUser(userData);
    }

    @Test
    void testLoginUser() throws Exception {
        when(userRepository.findByUserEmailIdAndUserPassword(loginCredentials.getUserEmailId(),
                loginCredentials.getUserPassword())).thenReturn(userData);
        mockMvc.perform(post("/api/v1/login")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(loginCredentials)))
                .andExpect(status().isOk());
        verify(userRepository, times(1)).findByUserEmailIdAndUserPassword(loginCredentials.getUserEmailId(), loginCredentials.getUserPassword());
    }
    @Test
    void shouldFailWhenWrongCredentials() throws Exception {
        when(userRepository.findByUserEmailIdAndUserPassword(wrongLoginCredentials.getUserEmailId(),
                wrongLoginCredentials.getUserPassword())).thenReturn(wrongUserData);
        mockMvc.perform(post("/api/v1/login")
                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(wrongLoginCredentials)))
                .andExpect(status().isConflict());
        verify(userRepository, times(1)).findByUserEmailIdAndUserPassword(wrongLoginCredentials.getUserEmailId(), wrongLoginCredentials.getUserPassword());
    }

    public static String asJsonString(final Object obj){
        try{
            return new ObjectMapper().writeValueAsString(obj);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}