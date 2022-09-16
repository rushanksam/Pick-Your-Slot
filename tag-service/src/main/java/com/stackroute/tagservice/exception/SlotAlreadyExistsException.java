/**
 * @author mohitraghuvanshi
 * Date 25/04/22
 **/
package com.stackroute.tagservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.ALREADY_REPORTED, reason = "Slot with same id already present.")
public class SlotAlreadyExistsException extends Exception{
}
