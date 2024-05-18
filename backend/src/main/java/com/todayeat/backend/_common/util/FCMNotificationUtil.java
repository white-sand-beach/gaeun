package com.todayeat.backend._common.util;

import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MulticastMessage;
import com.google.firebase.messaging.SendResponse;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.fcmtoken.entity.FCMToken;
import com.todayeat.backend.fcmtoken.repository.FCMTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class FCMNotificationUtil {

    private final FCMTokenRepository fcmTokenRepository;

    public void sendToOne(Long memberId, String role, String title, String body) {

        List<String> tokenList = getTokenList(memberId, role);

        send(tokenList, getMulticastMessage(tokenList, title, body));
    }

    public void sendToMany(List<Long> memberIdList, String role, String title, String body) {

        List<String> tokenList = new ArrayList<>();

        for(Long memberId : memberIdList) {
            tokenList.addAll(getTokenList(memberId, role));
        }

        send(tokenList, getMulticastMessage(tokenList, title, body));
    }

    private List<String> getTokenList(Long memberId, String role) {

        List<FCMToken> tokens = fcmTokenRepository.findByMemberIdAndRole(memberId, role);

        return tokens.stream()
                .map(FCMToken::getId)
                .collect(Collectors.toList());
    }

    private MulticastMessage getMulticastMessage (List<String> tokenList, String title, String body) {

        return MulticastMessage.builder()
                .putData("title", title)
                .putData("body", body)
                .addAllTokens(tokenList)
                .build();
    }

    private void send(List<String> tokenList, MulticastMessage message) {

        try {
            BatchResponse batchResponse = FirebaseMessaging.getInstance().sendMulticast(message);

            if (batchResponse.getFailureCount() > 0) {
                List<SendResponse> responses = batchResponse.getResponses();
                List<String> failedTokens = new ArrayList<>();
                for (int i = 0; i < responses.size(); i++) {
                    if (!responses.get(i).isSuccessful()) {
                        // The order of responses corresponds to the order of the registration tokens.
                        failedTokens.add(tokenList.get(i));
                    }
                }
            }
        } catch (FirebaseMessagingException e) {

            log.error("FirebaseMessagingException: {}", e.toString());
            throw new BusinessException(ErrorType.NOTIFICATION_SEND_FAIL);
        }
    }
}
