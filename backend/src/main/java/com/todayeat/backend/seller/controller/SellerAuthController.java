package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.CheckEmailRequest;
import com.todayeat.backend.seller.dto.request.FindEmailSellerRequest;
import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import com.todayeat.backend.seller.dto.response.CheckEmailSellerResponse;
import com.todayeat.backend.seller.dto.response.FindEmailSellerResponse;
import com.todayeat.backend.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.*;


@RestController
@RequiredArgsConstructor
public class SellerAuthController implements SellerAuthControllerDocs {

    private final SellerService sellerService;

    @Override
    public SuccessResponse<Void> signup(SignupSellerRequest signupSellerRequest) {

        sellerService.signup(signupSellerRequest);
        return SuccessResponse.of(CREATE_SELLER_SUCCESS);
    }

    @Override
    public SuccessResponse<CheckEmailSellerResponse> checkEmail(CheckEmailRequest checkEmailRequest) {

        return SuccessResponse.of(sellerService.checkEmail(checkEmailRequest), CHECK_EMAIL_SUCCESS);
    }

    @Override
    public SuccessResponse<FindEmailSellerResponse> fineEmail(FindEmailSellerRequest findEmailSellerRequest) {

        return SuccessResponse.of(sellerService.findEmail(findEmailSellerRequest), GET_EMAIL_SUCCESS);
    }
}
