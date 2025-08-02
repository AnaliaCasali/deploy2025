package com.backend.ISP63.service;

import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
 public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String email;

    public void sendEmail(String emailTo, String subject, String text) {
        if (emailTo == null || emailTo.trim().isEmpty()) {
                return;
        }

      try {
          SimpleMailMessage message = new SimpleMailMessage();
          message.setTo(emailTo);
          message.setSubject(subject);
          message.setText(text);
          message.setFrom(email);

          mailSender.send(message);
      }catch(Exception e)
      {throw new RuntimeException(e);}
    }
}
