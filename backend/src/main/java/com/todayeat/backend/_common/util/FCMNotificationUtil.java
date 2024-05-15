package com.todayeat.backend._common.util;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MulticastMessage;
import com.todayeat.backend.fcmtoken.entity.FCMToken;
import com.todayeat.backend.fcmtoken.repository.FCMTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class FCMNotificationUtil {

    private final FCMTokenRepository fcmTokenRepository;

    public void sendToOneSeller(Long sellerId, String title, String body) throws FirebaseMessagingException {
        send(sellerId,"Seller", title, body);
    }

    private void send(Long memberId, String role, String title, String body) throws FirebaseMessagingException {

        List<FCMToken> tokens = fcmTokenRepository.findByMemberIdAndRole(memberId, role);

        List<String> tokenList = new ArrayList<>();

        for(FCMToken t : tokens) {
            tokenList.add(t.getId());
        }

        MulticastMessage message = MulticastMessage.builder()
                .putData("title", title)
                .putData("body", body)
                .addAllTokens(tokenList)
                .build();

        FirebaseMessaging.getInstance().sendMulticast(message);
    }


}
