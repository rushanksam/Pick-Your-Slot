/**
 * @author mohitraghuvanshi
 * Date 15/04/22
 **/
package com.stackroute.authenticationservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "User is disabled.")
public class UserIsDisabledException extends Exception{
}
