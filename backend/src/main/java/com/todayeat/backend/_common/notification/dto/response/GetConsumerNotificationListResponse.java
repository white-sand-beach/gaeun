package com.todayeat.backend._common.notification.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetConsumerNotificationListResponse", description = "소비자 알림 목록 조회 응답")
public class GetConsumerNotificationListResponse {

    @Schema(description = "리뷰 정보")
    private List<GetConsumerNotificationResponse> notificationList;

    @Schema(description = "현재 페이지", example = "0")
    private Integer page;

    @Schema(description = "다음 페이지 존재 여부", example = "true")
    private Boolean hasNext;

    @Builder
    private GetConsumerNotificationListResponse(List<GetConsumerNotificationResponse> notificationList, Integer page, Boolean hasNext) {
        this.notificationList = notificationList;
        this.page = page;
        this.hasNext = hasNext;
    }

    public static GetConsumerNotificationListResponse of(List<GetConsumerNotificationResponse> notificationList, Integer page, Boolean hasNext) {

        return builder()
                .notificationList(notificationList)
                .page(page)
                .hasNext(hasNext)
                .build();
    }
}
