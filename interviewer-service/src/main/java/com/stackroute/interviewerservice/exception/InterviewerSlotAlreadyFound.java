package com.stackroute.interviewerservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.ALREADY_REPORTED ,reason = "Slot details Already Exits ...")
public class InterviewerSlotAlreadyFound extends Exception{
}
