package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.NoProfileFoundException;
import com.stackroute.userservice.exception.UserProfileAlreadyExits;
import com.stackroute.userservice.model.TagTeamProfile;
import com.stackroute.userservice.repository.TagTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagTeamServiceImpl implements TagTeamService{

    @Autowired
    TagTeamRepository tagTeamRepository;

    /**
     *
     * @param tagProfile
     * @return
     */
    @Override
    public TagTeamProfile saveTagteamProfile(TagTeamProfile tagProfile) throws UserProfileAlreadyExits {
           Optional<TagTeamProfile> tagProfileOptional= tagTeamRepository.findById(tagProfile.getTagMemberEmailId());
           if (tagProfileOptional.isPresent())
               throw new UserProfileAlreadyExits();
           return tagTeamRepository.save(tagProfile);

    }

    /**
     *
     * @param email
     * @return
     * @throws NoProfileFoundException
     */
    @Override
    public Optional<TagTeamProfile> findByTagMemberEmailId(String email) throws NoProfileFoundException {
        Optional<TagTeamProfile> optProfile= tagTeamRepository.findById(email);
        if(optProfile.isEmpty())
            throw new NoProfileFoundException();
        return optProfile;
    }

    /**
     *
     * @param tagProfile
     * @return
     */
    @Override
    public TagTeamProfile updateTagTeamProfile(TagTeamProfile tagProfile) throws NoProfileFoundException {
        if(tagTeamRepository.existsById(tagProfile.getTagMemberEmailId()))
        {
            return tagTeamRepository.save(tagProfile);

        }
        else {
            throw new NoProfileFoundException();
        }
    }
}
