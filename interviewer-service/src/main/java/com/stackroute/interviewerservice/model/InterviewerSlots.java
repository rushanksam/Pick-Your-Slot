package com.stackroute.interviewerservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection="InterviewerSlots")
public class InterviewerSlots {

    @Id
    private String slotId;
    private String emailId;
    private String InterviewerName;
    private String slotDate;
    private String startTime;
    private String endTime;
    private String interviewerDesc;
    private String techTrack;
    private SlotStatus slotStatus;
}
