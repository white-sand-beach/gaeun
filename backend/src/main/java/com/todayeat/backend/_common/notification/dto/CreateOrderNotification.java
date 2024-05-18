package com.todayeat.backend._common.notification.dto;

import com.todayeat.backend.order.entity.OrderInfo;
import com.todayeat.backend.order.entity.OrderInfoStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

@Getter
public class CreateOrderNotification {

    private Long orderInfoId;

    private String orderNo;

    private String storeName;

    private String notifiedAt;

    private OrderInfoStatus orderStatus;

    private Integer paymentPrice;

    private String saleContent; // 메뉴명 외 1개

    @Builder
    private CreateOrderNotification(Long orderInfoId, String orderNo, String storeName, String notifiedAt, OrderInfoStatus orderStatus, Integer paymentPrice, String saleContent) {
        this.orderInfoId = orderInfoId;
        this.orderNo = orderNo;
        this.storeName = storeName;
        this.notifiedAt = notifiedAt;
        this.orderStatus = orderStatus;
        this.paymentPrice = paymentPrice;
        this.saleContent = saleContent;
    }

    public static CreateOrderNotification of(OrderInfo orderInfo, String saleName, Integer saleTotalCount) {

        return builder()
                .orderInfoId(orderInfo.getId())
                .orderNo(orderInfo.getOrderNo())
                .storeName(orderInfo.getStore().getName())
                .notifiedAt(getDate(orderInfo.getUpdatedAt()))
                .orderStatus(orderInfo.getStatus())
                .paymentPrice(orderInfo.getPaymentPrice())
                .saleContent(getSaleContent(saleName, saleTotalCount))
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

        sb.append(orderStatus.name()).append(",")
                .append(orderNo).append(",")
                .append(storeName).append(",")
                .append(notifiedAt).append(",")
                .append(paymentPrice).append(",")
                .append(saleContent);

        return sb.toString();
    }

    public String getTitle() {

        return orderStatus.getDescription() + " 알림";
    }

    public String getBody() {

        return saleContent;
    }

    private static String getDate(LocalDateTime localDateTime) {

        StringBuilder sb =  new StringBuilder();

        String date = localDateTime.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        String dayOfWeek = localDateTime.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);

        sb.append(date).append("(").append(dayOfWeek).append(")");
        return sb.toString();
    }

    private static String getSaleContent(String saleName, Integer saleTotalCount) {
        if (saleTotalCount == 1) {
            return saleName;
        }

        return saleName + (saleTotalCount - 1 + "개");
    }
}
