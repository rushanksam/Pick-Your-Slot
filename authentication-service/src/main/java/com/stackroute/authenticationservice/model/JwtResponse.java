/**
 * @author mohitraghuvanshi
 * Date 13/04/22
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
public class JwtResponse {

    private User userDetails;
    private String jwtToken;

}