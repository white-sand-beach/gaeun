package com.todayeat.backend.order.api.client;

import com.todayeat.backend.order.api.dto.request.CancelPaymentRequest;
import com.todayeat.backend.order.api.dto.response.CancelPaymentResponse;
import com.todayeat.backend.order.api.dto.response.GetPaymentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "IamportRequestClient", url = "https://api.portone.io")
public interface IamportRequestClient {

    @GetMapping(value = "/payments/{paymentId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    GetPaymentResponse getPayment(@RequestHeader(HttpHeaders.AUTHORIZATION) String apiSecret,
                                  @PathVariable String paymentId);

    @PostMapping(value = "/payments/{paymentId}/cancel", consumes = MediaType.APPLICATION_JSON_VALUE)
    CancelPaymentResponse cancelPayment(@RequestHeader(HttpHeaders.AUTHORIZATION) String apiSecret,
                                        @PathVariable String paymentId,
                                        @RequestBody CancelPaymentRequest request);
}
