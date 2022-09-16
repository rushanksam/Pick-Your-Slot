package com.stackroute.userservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 */
@Document(collection="TagTeamProfile")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TagTeamProfile {

    @Id
    private String tagMemberEmailId;//Primary
    private String  tagTeamName;// Unique
    private String tagMemberName;
    private String tagTeamPassword;
    private String tagTeamProfileImage;
    private String phoneNumber;
    private double experience;
    private String workLocation;
    private String aboutMe;

}
