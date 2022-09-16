/**
 * @author mohitraghuvanshi
 * Date 13/04/22
 **/
package com.stackroute.authenticationservice.utility;

import com.stackroute.authenticationservice.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtility {

    private static final String SECRET_KEY = "GlobalLogic";

    private static final int TOKEN_VALIDITY = 3600 * 5;

    public String getUserNameFromToken(String token){
        return getClaimFromToken(token, Claims::getSubject);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimResolver){
        final Claims claims = getAllClaimsFromToken(token);
        return claimResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public Boolean validateToken(String token, User userDetails){
        String userName = getUserNameFromToken(token);
        return  userName.equals(userDetails.getUserEmailId()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token){
        final Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }

    private Date getExpirationDateFromToken(String token){
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String generateToken(User userDetails, String userRole){
        Claims userClaims = new DefaultClaims();
        userClaims.put("EmailID", userDetails.getUserEmailId());
        userClaims.put("UserRole", userRole);

        return Jwts.builder()
                .setClaims(userClaims)
                .setSubject(userDetails.getUserEmailId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact()
                ;
    }

}
