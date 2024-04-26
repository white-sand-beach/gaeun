package com.todayeat.backend.seller.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.seller.dto.SellerCustomUserDetails;
import com.todayeat.backend.seller.dto.request.CheckEmailRequest;
import com.todayeat.backend.seller.dto.request.FindEmailSellerRequest;
import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import com.todayeat.backend.seller.dto.response.CheckEmailSellerResponse;
import com.todayeat.backend.seller.dto.response.FindEmailSellerResponse;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.mapper.SellerMapper;
import com.todayeat.backend.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerService implements UserDetailsService {

    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(SignupSellerRequest signupSellerRequest) {

        log.info("signupSellerRequest.getEmail() : {}", signupSellerRequest.getEmail());

        if (sellerRepository.existsByEmail(signupSellerRequest.getEmail())) {

            throw new BusinessException(EMAIL_CONFLICT);
        }

        Seller seller = SellerMapper.INSTANCE.signupSellerRequestToSeller(signupSellerRequest, passwordEncoder);
        log.info("seller.getEmail(): {}", seller.getEmail());

        sellerRepository.save(seller);
    }

    public CheckEmailSellerResponse checkEmail(CheckEmailRequest checkEmailRequest) {

        log.info("checkEmailRequest.getEmail() : {}", checkEmailRequest.getEmail());

        boolean isValid = sellerRepository.existsByEmail(checkEmailRequest.getEmail());
        log.info("isValid : {}", isValid);

        CheckEmailSellerResponse checkEmailSellerResponse = new CheckEmailSellerResponse();
        checkEmailSellerResponse.setValid(isValid);

        return checkEmailSellerResponse;
    }

    public FindEmailSellerResponse findEmail(FindEmailSellerRequest findEmailSellerRequest) {

        log.info("findEmailSellerRequest.getPhoneNumber() : {}", findEmailSellerRequest.getPhoneNumber());

        Seller seller = sellerRepository.findByPhoneNumber(findEmailSellerRequest.getPhoneNumber());

        if (seller == null) {

            throw new BusinessException(PHONE_NUMBER_NOT_FOUND);
        }
        log.info("seller.getEmail() : {}", seller.getEmail());

        return SellerMapper.INSTANCE.SellerToFindEmailSellerResponse(seller);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        log.info("email : {}", email);

        Seller seller = sellerRepository.findByEmail(email);
        log.info("seller : {}", seller);

        if (seller == null) {

            throw new BusinessException(EMAIL_NOT_FOUND);
        }

        return new SellerCustomUserDetails(seller);
    }
}
