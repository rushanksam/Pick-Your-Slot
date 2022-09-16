package com.stackroute.tagservice.repository;

import com.stackroute.tagservice.exception.NoSlotFoundException;
import com.stackroute.tagservice.model.BookedSlots;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookedSlotsRepository extends MongoRepository<BookedSlots, String> {
    List<BookedSlots> findByTagMemberEmailId(String tagMemberEmailId) throws NoSlotFoundException;
    List<BookedSlots> findByInterviewerEmailId(String interviewerEmailId) throws NoSlotFoundException;

    boolean findByTagMemberEmailIdAndSlotBookedDateAndSlotDateAndInterviewerEmailIdAndStartTimeAndEndTime(
            String tagMemberEmailId,
            String slotBookedDate,
            String slotDate,
            String interviewerEmailId,
            String startTime,
            String endTime
    );

    List<BookedSlots> findByTagTeamName(String tagTeamName)throws NoSlotFoundException;
}
