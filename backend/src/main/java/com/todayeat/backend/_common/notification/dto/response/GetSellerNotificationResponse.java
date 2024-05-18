package com.todayeat.backend._common.notification.dto.response;

import com.todayeat.backend._common.notification.entity.SellerNotification;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Schema(name = "GetSellerNotificationResponse", description = "판매자 알림 조회 응답")
public class GetSellerNotificationResponse {

    @Schema(description = "알림 ID", example = "1")
    private Long id;

    @Schema(description = "알림 유형", example = "order, favorite, review")
    private String type;

    @Schema(description = "알림 유형 ID", example = "1")
    private Long typeId;

    @Schema(description = "알림 내용", example = "리스트 형태")
    private List<String> content;

    @Schema(description = "알림 읽음 여부", example = "true / false")
    private Boolean isRead;

    @Builder
    private GetSellerNotificationResponse(Long id, String type, Long typeId, String content, Boolean isRead) {
        this.id = id;
        this.type = type;
        this.typeId = typeId;
        this.content = new ArrayList<>(Arrays.asList(content.split(",")));
        this.isRead = isRead;
    }

    public static GetSellerNotificationResponse from(SellerNotification sellerNotification) {

        return builder()
                .id(sellerNotification.getId())
                .type(sellerNotification.getType())
                .typeId(sellerNotification.getTypeId())
                .content(sellerNotification.getContent())
                .isRead(sellerNotification.getIsRead())
                .build();
    }
}
