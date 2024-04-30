package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.*;
import com.todayeat.backend.seller.dto.response.CheckEmailSellerResponse;
import com.todayeat.backend.seller.dto.response.CheckRegisteredNoSellerResponse;
import com.todayeat.backend.seller.dto.response.CheckTempPasswordSellerResponse;
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
    public SuccessResponse<CheckEmailSellerResponse> checkEmail(CheckEmailSellerRequest checkEmailSellerRequest) {

        return SuccessResponse.of(sellerService.checkEmail(checkEmailSellerRequest), CHECK_EMAIL_SUCCESS);
    }
    @Override
    public SuccessResponse<CheckRegisteredNoSellerResponse> checkRegisteredNo(CheckRegisteredNoSellerRequest checkRegisteredNoSellerRequest) {

        return SuccessResponse.of(sellerService.checkRegisteredNo(checkRegisteredNoSellerRequest), CHECK_REGISTERED_NO_SUCCESS);
    }

    @Override
    public SuccessResponse<FindEmailSellerResponse> fineEmail(FindEmailSellerRequest findEmailSellerRequest) {

        return SuccessResponse.of(sellerService.findEmail(findEmailSellerRequest), GET_EMAIL_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> createTempPassword(CreateTempPasswordSellerRequest createTempPasswordSellerRequest) {

        sellerService.createTempPassword(createTempPasswordSellerRequest);
        return SuccessResponse.of(GET_TEMP_PASSWORD_SUCCESS);
    }

    @Override
    public SuccessResponse<CheckTempPasswordSellerResponse> checkTempPassword(CheckTempPasswordSellerRequest checkTempPasswordSellerRequest) {

        return SuccessResponse.of(sellerService.checkTempPassword(checkTempPasswordSellerRequest), CHECK_TEMP_PASSWORD_SUCCESS);
    }
}
