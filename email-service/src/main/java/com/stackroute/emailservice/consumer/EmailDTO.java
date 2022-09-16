/**
 * @author mohitraghuvanshi
 * Date 02/05/22
 **/
package com.stackroute.emailservice.consumer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmailDTO {
    private String tagMemberEmailId;
    private String interviewDesc;
    private String interviewerEmailId;
    private String slotBookDate;
    private String slotStartTime;
    private String slotEndTime;
    private String techTrack;
    private String bookedBy;
    private String slotStatus;
}
