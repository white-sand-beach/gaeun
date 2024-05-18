package com.todayeat.backend._common.notification.controller;

import com.todayeat.backend._common.notification.dto.response.GetSellerNotificationCountResponse;
import com.todayeat.backend._common.notification.dto.response.GetSellerNotificationListResponse;
import com.todayeat.backend._common.notification.service.SellerNotificationService;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend._common.response.success.SuccessType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SellerNotificationController implements SellerNotificationControllerDocs{

    private final SellerNotificationService sellerNotificationService;

    @Override
    public SuccessResponse<GetSellerNotificationListResponse> getList(Integer page, Integer size) {

        return SuccessResponse.of(sellerNotificationService.getList(page, size), SuccessType.GET_SELLER_NOTIFICATION_LIST_SUCCESS);
    }

    @Override
    public SuccessResponse<GetSellerNotificationCountResponse> getCount() {


        return SuccessResponse.of(sellerNotificationService.getCount() ,SuccessType.GET_SELLER_NOTIFICATION_COUNT_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> isReadTrue(Long sellerNotificationId) {

        sellerNotificationService.isReadTrue(sellerNotificationId);

        return  SuccessResponse.of(SuccessType.UPDATE_SELLER_NOTIFICATION_IS_READ_TRUE);
    }
}
