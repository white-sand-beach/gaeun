package com.todayeat.backend.order.dto.response.consumer;

import com.todayeat.backend.consumer.entity.Consumer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(name = "CreateOrderResponse", description = "주문 등록 응답")
public class CreateOrderResponse {

    @Schema(description = "주문 고유번호, 결제 후 결제 검증 로직에 필요합니다.", example = "1")
    private Long orderInfoId;

    @Schema(description = "나눔 여부", example = "false")
    private Boolean isDonated;

    @Schema(description = "결제 가격", example = "10000")
    private Integer paymentPrice;

    @Schema(description = "소비자 닉네임", example = "김지녕")
    private String consumerNickname;

    @Schema(description = "소비자 이메일", example = "example@domain.com")
    private String consumerEmail;

    @Schema(description = "소비자 휴대폰번호", example = "01011112222")
    private String consumerPhoneNumber;

    @Builder
    private CreateOrderResponse(Long orderInfoId, Boolean isDonated, Integer paymentPrice, String consumerNickname, String consumerEmail, String consumerPhoneNumber) {
        this.orderInfoId = orderInfoId;
        this.isDonated = isDonated;
        this.paymentPrice = paymentPrice;
        this.consumerNickname = consumerNickname;
        this.consumerEmail = consumerEmail;
        this.consumerPhoneNumber = consumerPhoneNumber;
    }

    public static CreateOrderResponse of(Long orderInfoId, Integer paymentPrice, Consumer consumer) {
        return builder()
                .orderInfoId(orderInfoId)
                .isDonated(consumer.getIsDonated())
                .paymentPrice(paymentPrice)
                .consumerNickname(consumer.getNickname())
                .consumerEmail(consumer.getEmail())
                .consumerPhoneNumber(consumer.getPhoneNumber())
                .build();
    }
}
