package com.todayeat.backend._common.notification.dto;

import com.todayeat.backend.consumer.entity.Consumer;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class CreateFavoriteNotification {

    private Long storeId;

    private String storeName;

    private List<Long> consumerIdList;

    @Builder
    private CreateFavoriteNotification(Long storeId, String storeName, List<Long> consumerIdList) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.consumerIdList = consumerIdList;
    }

    public static CreateFavoriteNotification of(Long storeId, String storeName, List<Long> consumerIdList) {

        return builder()
                .storeId(storeId)
                .storeName(storeName)
                .consumerIdList(consumerIdList)
                .build();
    }

    public String getType() {

        return "favorite";
    }

    public Long getTypeId() {

        return storeId;
    }

    public String getContent() {

        return storeName + "에 음식 나눔이 시작됐어요. 확인해보러 갈까요?";
    }

    public String getTitle() {

        return storeName + " 음식 나눔";
    }

    public String getBody() {

        return storeName + "에 음식 나눔이 시작됐어요. 확인해보러 갈까요?";
    }

    public void updateConsumerIdList(List<Long> consumerIdList) {
        this.consumerIdList = consumerIdList;
    }
}
