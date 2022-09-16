/**
 * @author mohitraghuvanshi
 * Date 22/04/22
 **/
package com.stackroute.tagservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Unable to find slot details.")
public class NoSlotFoundException extends Exception{
}
