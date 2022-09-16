package com.stackroute.interviewerservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND ,reason = "Slot details Not Exits ...")
public class InterviewerSlotNotFound extends Exception {
}
