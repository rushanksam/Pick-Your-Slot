/**
 * @author mohitraghuvanshi
 * Date 02/05/22
 **/
package com.stackroute.emailservice.consumer;

import com.stackroute.emailservice.model.Email;
import com.stackroute.emailservice.service.EmailServiceImpl;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    Email email = new Email();

    @Autowired
    EmailServiceImpl emailService;

    @RabbitListener(queues = "slot_queue")
    public void messageListner(EmailDTO emailDTO){
        emailService.sendEmail(loadEmail(emailDTO));
    }
    public Email loadEmail(EmailDTO emailDTO){
        email.setMailFrom(emailDTO.getTagMemberEmailId());
        email.setMailTo(emailDTO.getInterviewerEmailId());
        email.setMailCc("");
        email.setMailBcc("");
        email.setMailSubject("Slot Booked!");

        String emailBody = "Hello Interviewer, \n\nYour Interview Slot Schedule Details are:\n"
                +"Slot Status : "+emailDTO.getSlotStatus() + "\n" +
                "Slot Booked By : "+emailDTO.getBookedBy() +
                "\nSlot Booking Date : " + emailDTO.getSlotBookDate() +
                "\nDescription : "+ emailDTO.getInterviewDesc() +
                "\n\nTimings are as followed" +
                "\nStart Time : " + emailDTO.getSlotStartTime() +
                "\nEnd Time : " + emailDTO.getSlotEndTime() +
                "\n\nRequest you to be available on mentioned time slot for interview." +
                "\n\nThanks and Regards" +
                "\n" + emailDTO.getBookedBy() +
                "\nTAG Team";

        email.setMailContent(emailBody);
        return email;
    }
}
