package com.todayeat.backend._common.util;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import static com.todayeat.backend._common.response.error.ErrorType.MAIL_INTERNAL_SERVER_ERROR;

@Component
@RequiredArgsConstructor
public class MailUtil {

    private final JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String from;


    public void sendEmail(String toEmail, String title, String text) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        try {
            helper.setFrom(from);
            helper.setTo(toEmail);
            helper.setSubject(title);
            helper.setText(text, true);
            emailSender.send(message);
        } catch (MessagingException e) {
            throw new BusinessException(MAIL_INTERNAL_SERVER_ERROR);
        }
    }
}
