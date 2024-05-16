package com.todayeat.backend.order.dto.response.consumer;

import com.todayeat.backend.order.dto.response.GetOrderInfoItemResponse;
import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import com.todayeat.backend.store.entity.Store;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import static com.todayeat.backend.order.entity.OrderInfoStatus.IN_PROGRESS;
import static com.todayeat.backend.order.entity.OrderInfoStatus.PREPARED;

@Getter
@Schema(name = "GetOrderDetailInProgressConsumerResponse", description = "소비자 진행중인 주문 상세 조회 응답")
public class GetOrderDetailConsumerResponse {

    @Schema(description = "주문 고유번호", example = "1")
    private Long orderInfoId;

    @Schema(description = "주문 번호", example = "UUID")
    private String orderNo;

    @Schema(description = "가게 고유번호", example = "1")
    private Long storeId;

    @Schema(description = "가게 이름", example = "20000")
    private String storeName;

    @Schema(description = "가게 전화번호", example = "20000")
    private String storeTel;

    @Schema(description = "주문 상태", example = "진행 중")
    private String orderStatus;

    @Schema(description = "주문 시간", example = "2024-05-14 17:06:23")
    private String orderDate;

    @Schema(description = "남은 시간", example = "20")
    private Integer restTime;

    @Schema(description = "주문 아이템")
    private List<GetOrderInfoItemResponse> orderItems;

    @Schema(description = "원래 금액", example = "40000")
    private Integer originalPrice;

    @Schema(description = "할인 금액", example = "20000")
    private Integer discountPrice;

    @Schema(description = "결제 금액", example = "20000")
    private Integer paymentPrice;

    @Builder
    private GetOrderDetailConsumerResponse(Long orderInfoId, String orderNo, Long storeId, String storeName, String storeTel, String orderStatus, String orderDate, Integer restTime, List<GetOrderInfoItemResponse> orderItems, Integer originalPrice, Integer discountPrice, Integer paymentPrice) {
        this.orderInfoId = orderInfoId;
        this.orderNo = orderNo;
        this.storeId = storeId;
        this.storeName = storeName;
        this.storeTel = storeTel;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.restTime = restTime;
        this.orderItems = orderItems;
        this.originalPrice = originalPrice;
        this.discountPrice = discountPrice;
        this.paymentPrice = paymentPrice;
    }

    public static GetOrderDetailConsumerResponse from(OrderInfo orderInfo) {

        Store store = orderInfo.getStore();

        return builder()
                .orderInfoId(orderInfo.getId())
                .orderNo(orderInfo.getOrderNo())
                .storeId(store.getId())
                .storeName(store.getName())
                .storeTel(store.getTel())
                .orderStatus(orderInfo.getStatus().getDescription())
                .orderDate(orderInfo.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .restTime(getRestTime(orderInfo.getStatus(), orderInfo.getApprovedAt(), orderInfo.getTakenTime()))
                .orderItems(
                        orderInfo.getOrderInfoItemList().stream()
                                .map(GetOrderInfoItemResponse::from)
                                .collect(Collectors.toList()))
                .originalPrice(orderInfo.getOriginalPrice())
                .discountPrice(orderInfo.getDiscountPrice())
                .paymentPrice(orderInfo.getPaymentPrice())
                .build();
    }

    private static Integer getRestTime(OrderInfoStatus status, LocalDateTime approvedAt, Integer takenTime) {

        // 진행중
        if (status == IN_PROGRESS) {
            // 최초 주문 시간으로부터 현재 시간까지 흐른 시간
            Integer time = Math.toIntExact(Duration.between(approvedAt, LocalDateTime.now()).getSeconds() / 60);

            // 예상 소요 시간 - time
            Integer restTime = takenTime - time;

            // 반환
            return restTime >= 0? restTime: 0;
        }

        // 준비 완료
        if (status == PREPARED) {
            return 0;
        }

        return null;
    }
}
