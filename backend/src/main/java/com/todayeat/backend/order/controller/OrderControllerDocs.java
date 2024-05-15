package com.todayeat.backend.order.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.order.dto.request.consumer.CreateOrderConsumerRequest;
import com.todayeat.backend.order.dto.request.seller.UpdateStatusSellerRequest;
import com.todayeat.backend.order.dto.request.consumer.ValidateOrderConsumerRequest;
import com.todayeat.backend.order.dto.response.consumer.CreateOrderResponse;
import com.todayeat.backend.order.dto.response.consumer.GetOrderDetailConsumerResponse;
import com.todayeat.backend.order.dto.response.consumer.GetOrderDetailSellerResponse;
import com.todayeat.backend.order.dto.response.consumer.GetOrderListConsumerResponse;
import com.todayeat.backend.order.dto.response.seller.GetOrderListFinishedSellerResponse;
import com.todayeat.backend.order.dto.response.seller.GetOrderListInProgressSellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "orders", description = "주문")
@RequestMapping("/api/orders")
public interface OrderControllerDocs {

    @Operation(summary = "주문 등록 (소비자)",
            description = """
                          `ROLE_CONSUMER` \n
                          request body 넣어주세요. \n
                          orderInfoId를 반환합니다. 이 값은 결제 검증에 쓰입니다.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = CreateOrderResponse.class)))
    @ApiResponse(responseCode = "400",
            description = "가게 영업 중이 아닐 경우 / 판매 중이 아닐 경우 / 실제 재고보다 장바구니 수량이 클 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "403",
            description = "장바구니에 접근 권한이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "가게가 없는 경우 / 장바구니가 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "409",
            description = "다른 가게의 음식이 장바구니에 존재",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PreAuthorize("hasRole('CONSUMER')")
    @PostMapping
    SuccessResponse<CreateOrderResponse> create(@RequestBody @Valid CreateOrderConsumerRequest request);

    @Operation(summary = "주문 검증 (소비자)",
            description = """
                          `ROLE_CONSUMER` \n
                          path variable, request body 넣어주세요. \n
                          검증이 완료되면 주문이 결제 완료 상태로 바뀝니다.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "400",
            description = "이미 결제가 완료된 주문인 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "주문이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "500",
            description = "아임포트 결제 검증에 실패한 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PreAuthorize("hasRole('CONSUMER')")
    @PutMapping("/{order-info-id}/validation")
    SuccessResponse<Void> validation(@PathVariable(value = "order-info-id", required = true)
                                     @Schema(description = "주문 고유번호", example = "1")
                                     Long orderInfoId,
                                     @RequestBody
                                     @Valid
                                     ValidateOrderConsumerRequest request);

    @Operation(summary = "주문 상태 변경 (판매자)",
            description = """
                          `ROLE_SELLER` \n
                          Path Variable, Request Body 넣어주세요. \n
                          - 현재 주문이 UNPAID / CANCEL / DENIED / FINISHED 상태 -> 변경 불가능
                          - 현재 주문이 PAID 상태 -> DENIED(거절) / IN_PROGRESS(수락) 가능
                          - 현재 주문이 IN_PROGRESS 상태 -> PREPARED(준비 완료) / CANCEL(취소) 가능
                          - 현재 주문이 PREPARED 상태 -> FINISHED(수령 완료) 가능 \n
                          ** IN_PROGRESS 상태로 변경할 때는 takenTime 도 함께 보내주셔야 합니다. 그 외에는 takenTime 값 안 보내주시면 됩니다. \n
                          ** 자세한건 request body 스키마 확인해주세요! \n
                          ** 취소 또는 거절로 상태를 변경할 때는 결제가 취소됩니다. \n
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "400",
            description = "상태 수정이 불가능한 경우 / takenTime 안 맞는 경우 ",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "403",
            description = "가게 접근 권한이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @ApiResponse(responseCode = "404",
            description = "주문이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/{order-info-id}/status/seller")
    SuccessResponse<Void> updateStatusBySeller(@PathVariable(value = "order-info-id", required = true)
                                               @Schema(description = "주문 고유번호", example = "1")
                                               Long orderInfoId,
                                               @RequestBody
                                               @Valid
                                               UpdateStatusSellerRequest request);

    @Operation(summary = "주문 상태 변경 (소비자)",
            description = """
                          `ROLE_CONSUMER` \n
                          주문을 취소합니다. 현재 주문 상태가 UNPAID, PAID 상태일 때만 가능합니다.
                          Path Variable 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @PreAuthorize("hasRole('CONSUMER')")
    @PutMapping("/{order-info-id}/status/consumer")
    SuccessResponse<Void> updateStatusByConsumer(@PathVariable(value = "order-info-id", required = true)
                                                @Schema(description = "주문 고유번호", example = "1")
                                                Long orderInfoId);

    @Operation(summary = "주문 목록 조회 (소비자)",
            description = """
                          `ROLE_CONSUMER` \n
                          주문 목록을 조회합니다.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetOrderListConsumerResponse.class)))
    @PreAuthorize("hasRole('CONSUMER')")
    @GetMapping
    SuccessResponse<GetOrderListConsumerResponse> getListConsumer();

    @Operation(summary = "진행중인 주문 목록 조회 (판매자)",
            description = """
                          `ROLE_SELLER` \n
                          해당 가게의 진행중인 주문 목록을 조회합니다. \n
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetOrderListInProgressSellerResponse.class)))
    @ApiResponse(responseCode = "403",
            description = "권한이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/in-progress")
    SuccessResponse<GetOrderListInProgressSellerResponse> getInProgressListSeller(@RequestParam(value = "store-id", required = true)
                                                                                  @Schema(description = "가게 고유번호", example = "1")
                                                                                  Long storeId);

    @Operation(summary = "종료된 주문 목록 조회 (판매자)",
            description = """
                          `ROLE_SELLER` \n
                          해당 가게의 종료된 주문 목록을 조회합니다. \n
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetOrderListFinishedSellerResponse.class)))
    @ApiResponse(responseCode = "403",
            description = "권한이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/finished")
    SuccessResponse<GetOrderListFinishedSellerResponse> getFinishedListSeller(@RequestParam(value = "store-id", required = true)
                                                                                @Schema(description = "가게 고유번호", example = "1")
                                                                                Long storeId);

    @Operation(summary = "주문 상세 조회 (소비자)",
            description = """
                          `ROLE_CONSUMER` \n
                          Path Variable로 order-info-id 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetOrderDetailConsumerResponse.class)))
    @ApiResponse(responseCode = "403",
            description = "권한이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PreAuthorize("hasRole('CONSUMER')")
    @GetMapping("/{order-info-id}/consumer")
    SuccessResponse<GetOrderDetailConsumerResponse> getOrderDetailConsumer(@PathVariable(value = "order-info-id", required = true)
                                                                          @Schema(description = "주문 고유번호", example = "1")
                                                                          Long orderInfoId);

    @Operation(summary = "주문 상세 조회 (판매자)",
            description = """
                          `ROLE_SELLER` \n
                          Path Variable로 order-info-id 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetOrderDetailSellerResponse.class)))
    @ApiResponse(responseCode = "403",
            description = "권한이 없는 경우",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/{order-info-id}/seller")
    SuccessResponse<GetOrderDetailSellerResponse> getOrderDetailSeller(@PathVariable(value = "order-info-id", required = true)
                                                                           @Schema(description = "주문 고유번호", example = "1")
                                                                           Long orderInfoId);
}
