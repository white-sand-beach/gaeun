package com.todayeat.backend.seller.controller;

import com.todayeat.backend.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SellerController implements SellerControllerDocs {

    private final SellerService sellerService;
}
