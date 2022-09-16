/**
 * @author mohitraghuvanshi
 * Date 13/04/22
 **/
package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exception.UserAlreadyPresentException;
import com.stackroute.authenticationservice.exception.UserIsDisabledException;
import com.stackroute.authenticationservice.exception.UserNotPresentException;
import com.stackroute.authenticationservice.exception.WrongCredentialsException;
import com.stackroute.authenticationservice.model.LoginCredentials;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.repository.UserRepository;
import com.stackroute.authenticationservice.utility.JwtUtility;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {
    private UserRepository userRepository;
    //private PasswordEncoder passwordEncoder;
    private JwtUtility jwtUtility;

    /**
     * A UserService class constructor @Autowired the objects of JwtUtility and UserRepository classes.
     * @param userRepository
     * @param jwtUtility
     */
    @Autowired
    public UserService(UserRepository userRepository, JwtUtility jwtUtility) {
        this.userRepository = userRepository;
        //this.passwordEncoder = passwordEncoder;
        this.jwtUtility = jwtUtility;
    }

    /**
     * <h1>Method to Create New User</h1>
     * This method will create new user and save it on database. It will also check if user already
     * present. And if present it will throw exception that User Already Present.
     * @param userData
     * @return the object of User after saving that object entity in database.
     * @throws UserAlreadyPresentException
     */
    public User createNewUser(User userData) throws UserAlreadyPresentException {
        if(userRepository.existsById(userData.getUserEmailId())){
            throw new UserAlreadyPresentException();
        }
        //userData.setUserPassword( getEncodedPassword(userData.getUserPassword()) );
        return userRepository.save(userData);
    }

    /**
     * <h1>Method to Authenticate User</h1>
     * This method will authenticate user by it's login id and password.
     * If user is authenticated it will generate a JWT token for session and return it in a form of HashMap.
     * @param loginCredentials
     * @return A HashMap with parameters <String, String> that will contain one message and a JWT Token String.
     * @throws UserNotPresentException
     * @throws UserIsDisabledException
     * @throws WrongCredentialsException
     */
    public HashMap<String, String> verifyUser(LoginCredentials loginCredentials) throws UserNotPresentException, UserIsDisabledException, WrongCredentialsException {
        HashMap<String, String> hashMap = new HashMap<>();
        String newGeneratedToken = "";
        User authenticatedUser = userRepository.findByUserEmailIdAndUserPassword(
                loginCredentials.getUserEmailId(), loginCredentials.getUserPassword() );
        if(authenticatedUser.getUserEmailId().equals(loginCredentials.getUserEmailId()) && authenticatedUser.getUserPassword().equals(loginCredentials.getUserPassword())){
            newGeneratedToken = jwtUtility.generateToken(authenticatedUser, authenticatedUser.getUserRole());
            hashMap.put("JWT_Token", newGeneratedToken);
        }
        return hashMap;
    }

//   public String getEncodedPassword(String password){
//        return passwordEncoder.encode(password);
//    }

}