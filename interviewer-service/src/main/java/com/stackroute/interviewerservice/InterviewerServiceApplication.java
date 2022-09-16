package com.stackroute.interviewerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@EnableEurekaClient
@EnableWebMvc
@SpringBootApplication
public class InterviewerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewerServiceApplication.class, args);
	}

}
