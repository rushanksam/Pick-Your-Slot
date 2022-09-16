/**
 * @author mohitraghuvanshi
 * Date 22/04/22
 **/
package com.stackroute.tagservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BookedSlots")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookedSlots {

    @Id
    private String bookedSlotId;            //Primary
    private String tagMemberEmailId;
    private String tagMemberName;
    private String tagTeamName;
    private String slotBookedDate;
    private String slotDate;
    private String startTime;
    private String endTime;
    private String techTrack;
    private String interviewDescription;
    private String interviewerName;
    private String interviewerEmailId;
    private String slotStatus;

}
