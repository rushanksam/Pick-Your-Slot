package com.stackroute.userservice.repository;

import com.stackroute.userservice.model.TagTeamProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TagTeamRepository extends MongoRepository<TagTeamProfile,String> {

}
