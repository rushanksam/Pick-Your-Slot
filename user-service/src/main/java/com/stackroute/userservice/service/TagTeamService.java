package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.TagTeamProfile;

import java.util.Optional;

public interface TagTeamService {

    TagTeamProfile saveTagteamProfile(TagTeamProfile tagProfile) throws UserProfileAlreadyExits;
    Optional<TagTeamProfile> findByTagMemberEmailId(String email) throws NoProfileFoundException;
    TagTeamProfile updateTagTeamProfile(TagTeamProfile tagProfile) throws NoProfileFoundException;
}
