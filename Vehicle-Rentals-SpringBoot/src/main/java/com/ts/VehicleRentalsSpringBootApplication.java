package com.ts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.ts.config.TwilioConfig;

@EnableJpaRepositories(basePackages = "com.ts.dao")
@EntityScan(basePackages = "com.ts.model")
@SpringBootApplication(scanBasePackages = "com.ts")
@Import(TwilioConfig.class)
public class VehicleRentalsSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleRentalsSpringBootApplication.class, args);
	}

}
