package com.todayeat.backend._common.notification.dto;

import com.todayeat.backend.consumer.entity.Consumer;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@Getter
public class CreateFavoriteNotification {

    private Long storeId;

    private String storeName;

    private List<Long> consumerIdList;

    private String updateAt;

    @Builder
    private CreateFavoriteNotification(Long storeId, String storeName, List<Long> consumerIdList, String updateAt) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.consumerIdList = consumerIdList;
        this.updateAt = updateAt;
    }

    public static CreateFavoriteNotification of(Long storeId, String storeName, List<Long> consumerIdList) {

        return builder()
                .storeId(storeId)
                .storeName(storeName)
                .consumerIdList(consumerIdList)
                .updateAt(getDate(LocalDateTime.now()))
                .build();
    }

    public String getType() {

        return "favorite";
    }

    public Long getTypeId() {

        return storeId;
    }

    public String getContent() {

        return storeName + "의 음식 나눔이 시작됐어요.," + storeName + "," +  updateAt;
    }

    public String getTitle() {

        return storeName + " 음식 나눔";
    }

    public String getBody() {

        return storeName + "의 음식 나눔이 시작됐어요.";
    }

    public void updateConsumerIdList(List<Long> consumerIdList) {
        this.consumerIdList = consumerIdList;
    }

    private static String getDate(LocalDateTime localDateTime) {

        StringBuilder sb =  new StringBuilder();

        String date = localDateTime.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        String dayOfWeek = localDateTime.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);

        sb.append(date).append("(").append(dayOfWeek).append(")");
        return sb.toString();
    }
}
