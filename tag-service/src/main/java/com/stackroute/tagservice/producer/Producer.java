/**
 * @author mohitraghuvanshi
 * Date 02/05/22
 **/
package com.stackroute.tagservice.producer;

import com.stackroute.tagservice.model.BookedSlots;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public BookedSlotsDTO getRabbitMQMessage(BookedSlots bookedSlots){
        BookedSlotsDTO rabbitMQModel = new BookedSlotsDTO();
        rabbitMQModel.setSlotBookDate(bookedSlots.getSlotDate());
        rabbitMQModel.setSlotStatus(bookedSlots.getSlotStatus());
        rabbitMQModel.setInterviewerEmailId(bookedSlots.getInterviewerEmailId());
        rabbitMQModel.setTagMemberEmailId(bookedSlots.getTagMemberEmailId());
        rabbitMQModel.setTechTrack(bookedSlots.getTechTrack());
        rabbitMQModel.setSlotStartTime(bookedSlots.getStartTime());
        rabbitMQModel.setSlotEndTime(bookedSlots.getEndTime());
        rabbitMQModel.setInterviewDesc(bookedSlots.getInterviewDescription());

        return rabbitMQModel;
    }

    public void sendRabbitMQMessage(BookedSlots bookedSlots, String bookedBy){
        BookedSlotsDTO rabbitMQModel = getRabbitMQMessage(bookedSlots);
        rabbitMQModel.setBookedBy(bookedBy);
        rabbitTemplate.convertAndSend(ProducerMessageConfig.SLOT_EXCHANGE, ProducerMessageConfig.ROUTING_KEY, rabbitMQModel);
    }

}
