package com.todayeat.backend._common.notification.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "GetSellerNotificationCountResponse", description = "판매자 미알림 개수 응답")
public class GetSellerNotificationCountResponse {

    @Schema(description = "미확인 알림 개수", example = "1")
    private Long count;

    @Builder
    private GetSellerNotificationCountResponse(Long count) {
        this.count = count;
    }

    public static GetSellerNotificationCountResponse of(Long count) {

        return builder()
                .count(count)
                .build();
    }
}
