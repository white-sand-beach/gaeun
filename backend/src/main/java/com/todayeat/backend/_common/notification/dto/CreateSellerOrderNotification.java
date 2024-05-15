package com.todayeat.backend._common.notification.dto;

import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.seller.entity.Seller;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class CreateSellerOrderNotification {

    private Long orderInfoId;

    private String orderNo;

    private LocalDateTime paidAt;

    private Integer paymentPrice;

    private List<CreateSellerOrderItemNotification> sellerOrderItemNotificationList;

    private Long sellerId;

    @Builder
    private CreateSellerOrderNotification(Long orderInfoId, String orderNo, LocalDateTime paidAt, Integer paymentPrice, List<CreateSellerOrderItemNotification> sellerOrderItemNotificationList, Long sellerId) {
        this.orderInfoId = orderInfoId;
        this.orderNo = orderNo;
        this.paidAt = paidAt;
        this.paymentPrice = paymentPrice;
        this.sellerOrderItemNotificationList = sellerOrderItemNotificationList;
        this.sellerId = sellerId;
    }

    public static CreateSellerOrderNotification from(OrderInfo orderInfo,List<CreateSellerOrderItemNotification> sellerOrderItemNotificationList, Long sellerId) {

        return builder()
                .orderInfoId(orderInfo.getId())
                .orderNo(orderInfo.getOrderNo())
                .paidAt(orderInfo.getUpdatedAt())
                .paymentPrice(orderInfo.getPaymentPrice())
                .sellerOrderItemNotificationList(sellerOrderItemNotificationList)
                .sellerId(sellerId)
                .build();
    }

    public String getType() {

        return "order";
    }

    public Long getTypeId() {

        return orderInfoId;
    }
    public String getContent() {

        StringBuilder sb = new StringBuilder();

        sb.append(orderNo).append(",")
                .append(paidAt).append(",")
                .append(paymentPrice).append(",");

        for(CreateSellerOrderItemNotification oin : sellerOrderItemNotificationList) {
            sb.append(oin.getName()).append(",")
                    .append(oin.getQuantity()).append(",");
        }

        return sb.toString();
    }

    public String getTitle() {

        return "주문번호: " + orderNo;
    }

    public String getBody() {

        StringBuilder sb = new StringBuilder();

        for(CreateSellerOrderItemNotification oin : sellerOrderItemNotificationList) {
            sb.append(oin.getName()).append(": ")
                    .append(oin.getQuantity()).append(", ");
        }

        sb.deleteCharAt(sb.length() - 1);
        sb.append("주문 들어왔습니다.");

        return sb.toString();
    }
}
