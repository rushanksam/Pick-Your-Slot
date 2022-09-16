/**
 * @author mohitraghuvanshi
 * Date 04/05/22
 **/
package com.stackroute.emailservice.service;

import com.stackroute.emailservice.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmail(Email email) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try{
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setSubject(email.getMailSubject());
            mimeMessageHelper.setFrom(email.getMailFrom());
            mimeMessageHelper.setTo(email.getMailTo());
            mimeMessageHelper.setText(email.getMailContent());

            javaMailSender.send(mimeMessageHelper.getMimeMessage());
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
