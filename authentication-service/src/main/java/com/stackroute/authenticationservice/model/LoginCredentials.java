/**
 * @author mohitraghuvanshi
 * Date 15/04/22
 **/
package com.stackroute.authenticationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginCredentials {
    private String userEmailId;
    private String userPassword;
}