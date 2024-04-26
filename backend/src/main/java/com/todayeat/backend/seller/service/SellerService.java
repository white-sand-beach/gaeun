package com.todayeat.backend.seller.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.seller.dto.request.CheckEmailRequest;
import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.mapper.SellerMapper;
import com.todayeat.backend.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.todayeat.backend._common.response.error.ErrorType.EMAIL_CONFLICT;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(SignupSellerRequest signupSellerRequest) {

        if (sellerRepository.existsByEmail(signupSellerRequest.getEmail())) {

            throw new BusinessException(EMAIL_CONFLICT);
        }

        Seller seller = SellerMapper.INSTANCE.signupSellerRequestToSeller(signupSellerRequest, passwordEncoder);

        sellerRepository.save(seller);
    }

    public Boolean checkEmail(CheckEmailRequest checkEmailRequest) {

        if (sellerRepository.existsByEmail(checkEmailRequest.getEmail())) {

            return false;
        }

        return true;
    }
}
