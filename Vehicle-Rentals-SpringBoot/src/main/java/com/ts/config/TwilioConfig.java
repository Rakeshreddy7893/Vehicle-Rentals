package com.ts.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Configuration
public class TwilioConfig {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @Bean
    public void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    public void sendOtp(String to, String otp) {
        Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(twilioPhoneNumber),
                "Your OTP is: " + otp
                ).create();
    }
}
