package com.todayeat.backend.order.dto.response.consumer;

import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoItem;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.store.entity.Store;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.todayeat.backend.order.entity.OrderInfoStatus.IN_PROGRESS;
import static com.todayeat.backend.order.entity.OrderInfoStatus.PREPARED;

@Getter
@Schema(name = "GetOrderInProgressConsumerResponse", description = "소비자 주문 현황 조회 응답")
public class GetOrderInProgressConsumerResponse {

    @Schema(description = "주문 고유번호", example = "1")
    private Long orderInfoId;

    @Schema(description = "주문 시간", example = "2024-05-14 17:06:23")
    private String orderDate;

    @Schema(description = "남은 시간", example = "20")
    private Integer orderRestTime;

    @Schema(description = "주문 상태", example = "진행 중")
    private String orderStatus;

    @Schema(description = "주문 내용", example = "마라샹궈 1개 외 2건")
    private String orderContents;

    @Schema(description = "가게 고유번호", example = "1")
    private Long storeId;

    @Schema(description = "가게 이름", example = "마라조아")
    private String storeName;

    @Schema(description = "가게 전화번호", example = "01011112222")
    private String storeTel;

    @Schema(description = "가게 지번 주소", example = "경상북도 구미시 임수동 94-1 1층")
    private String storeAddress;

    @Schema(description = "가게 도로명 주소", example = "경상북도 구미시 3공단3로 302 1층")
    private String storeRoadAddress;

    @Schema(description = "가게 위도", example = "36.108184")
    private BigDecimal storeLatitude;

    @Schema(description = "가게 경도", example = "128.413967")
    private BigDecimal storeLongitude;

    @Builder
    private GetOrderInProgressConsumerResponse(Long orderInfoId, String orderDate, Integer orderRestTime, String orderStatus, String orderContents, Long storeId, String storeName, String storeTel, String storeAddress, String storeRoadAddress, BigDecimal storeLatitude, BigDecimal storeLongitude) {
        this.orderInfoId = orderInfoId;
        this.orderDate = orderDate;
        this.orderRestTime = orderRestTime;
        this.orderStatus = orderStatus;
        this.orderContents = orderContents;
        this.storeId = storeId;
        this.storeName = storeName;
        this.storeTel = storeTel;
        this.storeAddress = storeAddress;
        this.storeRoadAddress = storeRoadAddress;
        this.storeLatitude = storeLatitude;
        this.storeLongitude = storeLongitude;
    }

    public static GetOrderInProgressConsumerResponse from(OrderInfo orderInfo) {

        Store store = orderInfo.getStore();

        return builder()
                .orderInfoId(orderInfo.getId())
                .orderDate(orderInfo.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .orderRestTime(getRestTime(orderInfo.getStatus(), orderInfo.getApprovedAt(), orderInfo.getTakenTime()))
                .orderStatus(orderInfo.getStatus().getDescription())
                .orderContents(getContents(orderInfo.getOrderInfoItemList()))
                .storeId(orderInfo.getStore().getId())
                .storeName(store.getName())
                .storeTel(store.getTel())
                .storeAddress(store.getAddress())
                .storeRoadAddress(store.getRoadAddress())
                .storeLatitude(store.getLocation().getLat())
                .storeLongitude(store.getLocation().getLon())
                .build();
    }

    private static String getContents(List<OrderInfoItem> orderInfoItems) {

        OrderInfoItem firstItem = orderInfoItems.getFirst();

        StringBuilder sb =  new StringBuilder();
        sb.append(firstItem.getName()).append(" ").append(firstItem.getQuantity()).append("개");

        if (orderInfoItems.size() == 1) {
            return sb.toString();
        }

        sb.append(" 외 ").append(orderInfoItems.size() - 1).append("건");
        return sb.toString();
    }

    private static Integer getRestTime(OrderInfoStatus status, LocalDateTime approvedAt, Integer takenTime) {

        // 진행중
        if (status == IN_PROGRESS) {
            // 최초 주문 시간으로부터 현재 시간까지 흐른 시간
            Integer time = Math.toIntExact(Duration.between(approvedAt, LocalDateTime.now()).getSeconds() / 60);

            // 예상 소요 시간 - time
            Integer restTime = takenTime - time;

            // 반환
            return restTime >= 0 ? restTime : 0;
        }

        // 준비 완료
        if (status == PREPARED) {
            return 0;
        }

        return null;
    }
}
