package com.stackroute.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * InterviewerProfile model class with
 * All Arguments Constructor
 * To String methode
 */
@Document(collection="InterviewerProfile")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InterviewerProfile {

    @Id
    private String interviewerEmailId; //Primary
    private String interviewerName;
    private String userPassword;
    private String profileImage;
    private String phoneNumber;
    private String techTrack;
    private Double experience;
    private String workLocation;
    private String aboutMe;


}
