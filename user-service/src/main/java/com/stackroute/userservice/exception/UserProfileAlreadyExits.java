package com.stackroute.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.ALREADY_REPORTED ,reason = "Profile details Already Exits ...")
public class UserProfileAlreadyExits extends Exception{
}
