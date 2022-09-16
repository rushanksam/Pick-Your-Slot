package com.stackroute.pickyourslotwebapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class PickyourslotWebappApplication {

	public static void main(String[] args) {
		SpringApplication.run(PickyourslotWebappApplication.class, args);
	}

}
