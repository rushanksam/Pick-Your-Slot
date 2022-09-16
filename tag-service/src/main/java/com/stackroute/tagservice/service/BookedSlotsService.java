package com.stackroute.tagservice.service;

import com.stackroute.tagservice.exception.NoSlotFoundException;
import com.stackroute.tagservice.model.BookedSlots;

import java.util.List;

public interface BookedSlotsService {

    List<BookedSlots> getSlotsForTagMemberEmailId(String tagMemberEmailId) throws NoSlotFoundException;
    List<BookedSlots> getSlotsForInterviewerEmailId(String interviewerEmailId) throws NoSlotFoundException;
    List<BookedSlots> getAllSlotsByTagTeamName(String tagTeamName) throws NoSlotFoundException;

    List<BookedSlots> getAllSlots() throws NoSlotFoundException;
}
