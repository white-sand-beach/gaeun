package com.todayeat.backend.seller.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.seller.dto.request.UpdatePasswordSellerRequest;
import com.todayeat.backend.seller.dto.request.UpdatePhoneNumberSellerRequest;
import com.todayeat.backend.seller.dto.response.GetSellerResponse;
import com.todayeat.backend.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.*;

@RestController
@RequiredArgsConstructor
public class SellerController implements SellerControllerDocs {

    private final SellerService sellerService;

    @Override
    public SuccessResponse<GetSellerResponse> getInfo() {

        return SuccessResponse.of(sellerService.getInfo(), GET_SELLER_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updatePassword(UpdatePasswordSellerRequest updatePasswordSellerRequest) {

        sellerService.updatePassword(updatePasswordSellerRequest);
        return SuccessResponse.of(UPDATE_PASSWORD_SELLER_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updatePhoneNumber(UpdatePhoneNumberSellerRequest updatePhoneNumberSellerRequest) {

        sellerService.updatePhoneNumber(updatePhoneNumberSellerRequest);
        return SuccessResponse.of(UPDATE_PHONE_NUMBER_SELLER_SUCCESS);
    }
}
