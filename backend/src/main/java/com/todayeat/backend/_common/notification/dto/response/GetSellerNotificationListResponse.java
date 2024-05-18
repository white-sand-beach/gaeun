package com.todayeat.backend._common.notification.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Schema(name = "GetSellerNotificationListResponse", description = "판매자 알림 목록 조회 응답")
public class GetSellerNotificationListResponse {

    @Schema(description = "리뷰 정보")
    private List<GetSellerNotificationResponse> notificationList;

    @Schema(description = "현재 페이지", example = "0")
    private Integer page;

    @Schema(description = "다음 페이지 존재 여부", example = "true")
    private Boolean hasNext;

    @Builder
    private GetSellerNotificationListResponse(List<GetSellerNotificationResponse> notificationList, Integer page, Boolean hasNext, Long totalCnt) {
        this.notificationList = notificationList;
        this.page = page;
        this.hasNext = hasNext;
    }

    public static GetSellerNotificationListResponse of(List<GetSellerNotificationResponse> notificationList, Integer page, Boolean hasNext) {

        return builder()
                .notificationList(notificationList)
                .page(page)
                .hasNext(hasNext)
                .build();
    }
}
