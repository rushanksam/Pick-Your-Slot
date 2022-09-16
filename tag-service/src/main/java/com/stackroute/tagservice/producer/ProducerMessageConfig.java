/**
 * @author mohitraghuvanshi
 * Date 02/05/22
 **/
package com.stackroute.tagservice.producer;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProducerMessageConfig {

    public static final String SLOT_QUEUE = "slot_queue";
    public static final String SLOT_EXCHANGE = "slot_exchange";
    public static final String ROUTING_KEY = "slot_key";

    @Bean
    public Queue queue(){
        return new Queue(SLOT_QUEUE, true);
    }

    @Bean
    public DirectExchange exchange(){
        return new DirectExchange(SLOT_EXCHANGE);
    }

    @Bean
    public Binding binding(Queue queue, DirectExchange directExchange){
        return BindingBuilder.bind(queue)
                .to(directExchange)
                .with(ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate template(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }
}
