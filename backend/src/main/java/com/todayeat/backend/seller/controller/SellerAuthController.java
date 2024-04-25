package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import com.todayeat.backend.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.CREATE_SELLER_SUCCESS;


@RestController
@RequiredArgsConstructor
public class SellerAuthController implements SellerAuthControllerDocs {

    private final SellerService sellerService;

    @Override
    public SuccessResponse signup(SignupSellerRequest signupSellerRequest) {

        sellerService.signup(signupSellerRequest);
        return SuccessResponse.of(CREATE_SELLER_SUCCESS);
    }
}
