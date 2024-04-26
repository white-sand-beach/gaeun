package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.CheckEmailRequest;
import com.todayeat.backend.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.CHECK_EMAIL_SUCCESS;

@RestController
@RequiredArgsConstructor
public class SellerController implements SellerControllerDocs {

    private final SellerService sellerService;

    @Override
    public SuccessResponse<Boolean> checkEmail(CheckEmailRequest checkEmailRequest) {

        return SuccessResponse.of(sellerService.checkEmail(checkEmailRequest), CHECK_EMAIL_SUCCESS);
    }
}
