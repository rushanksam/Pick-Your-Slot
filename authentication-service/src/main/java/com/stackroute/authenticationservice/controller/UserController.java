/**
 * @author mohitraghuvanshi
 * Date 13/04/22
 **/
package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.exception.UserAlreadyPresentException;
import com.stackroute.authenticationservice.exception.UserIsDisabledException;
import com.stackroute.authenticationservice.exception.UserNotPresentException;
import com.stackroute.authenticationservice.exception.WrongCredentialsException;
import com.stackroute.authenticationservice.model.LoginCredentials;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.repository.UserRepository;
import com.stackroute.authenticationservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1")
public class UserController {

    private UserService userService;
    private UserRepository userRepository;

    /**
     * A UserController class constructor autowiring the objects of UserService and UserRepository classes.
     *
     * @param userService
     * @param userRepository
     * @since 13/04/22
     *
     */
    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    private ResponseEntity responseEntity;

    /**
     * <h1>Method for Creating new User.</h1>
     * This method will create a new user when the request is recieved from the Post Mapping.
     * This method will also check if user is already present and will throw an exception for the same.
     * @param userData
     * @return A response entity with a message and HttpStatus
     * @throws UserAlreadyPresentException
     * @since 13/04/22
     */
    @PostMapping()
    public ResponseEntity<?> createNewUser(@RequestBody User userData) throws UserAlreadyPresentException {
        try{
            userService.createNewUser(userData);
            responseEntity =new  ResponseEntity<>("User Created Successfully!", HttpStatus.CREATED);
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>("User Already Exists!", HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    /**
     * <h1>Method to Authenticate User</h1>
     * This method will authenticate user by comparing the credentials provided by the user and
     * details present in database. Post Mapping from client will invoke this method and Service Layer method
     * will be called to generate JWT token for creating a session for the authenticated user.
     * @param loginCredentials
     * @return A response entity with a message and HttpStatus
     * @throws UserNotPresentException
     * @throws UserIsDisabledException
     * @throws WrongCredentialsException
     * @since 13/04/22
     */
    @PostMapping({"/login"})
    public ResponseEntity<?> loginUser(@RequestBody LoginCredentials loginCredentials) throws UserNotPresentException, UserIsDisabledException, WrongCredentialsException {
        try{
            User authenticatedUser = userRepository.findByUserEmailIdAndUserPassword(
                    loginCredentials.getUserEmailId(),
                    loginCredentials.getUserPassword());

            if(authenticatedUser.getUserEmailId().equals(loginCredentials.getUserEmailId())
                    && authenticatedUser.getUserPassword().equals(loginCredentials.getUserPassword())){
                responseEntity =  new ResponseEntity<>(userService.verifyUser(loginCredentials), HttpStatus.OK);
            }else{
                responseEntity = new ResponseEntity<>("Wrong Credentials!", HttpStatus.CONFLICT);
            }
        }
        catch (UserNotPresentException e){
            e.printStackTrace();
            responseEntity = new ResponseEntity<>("User Not Found!", HttpStatus.NOT_FOUND);
        }
        catch (UserIsDisabledException e){
            e.printStackTrace();
            responseEntity = new ResponseEntity<>("User is Disabled", HttpStatus.CONFLICT);
        }catch (WrongCredentialsException e){
            e.printStackTrace();
            responseEntity = new ResponseEntity<>("Wrong Credentials Entered", HttpStatus.CONFLICT);
        }
        return responseEntity;
    }
}