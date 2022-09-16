package com.stackroute.authenticationservice.repository;

import com.stackroute.authenticationservice.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    User findByUserEmailIdAndUserPassword(String emailId, String userPassword);
}
