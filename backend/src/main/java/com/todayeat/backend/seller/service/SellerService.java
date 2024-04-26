package com.todayeat.backend.seller.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.seller.dto.SellerCustomUserDetails;
import com.todayeat.backend.seller.dto.request.CheckEmailRequest;
import com.todayeat.backend.seller.dto.request.FindEmailSellerRequest;
import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import com.todayeat.backend.seller.dto.response.CheckEmailSellerResponse;
import com.todayeat.backend.seller.dto.response.FindEmailSellerResponse;
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

        sellerRepository.save(SellerMapper.INSTANCE.signupSellerRequestToSeller(signupSellerRequest, passwordEncoder));
    }

    public CheckEmailSellerResponse checkEmail(CheckEmailRequest checkEmailRequest) {

        log.info("checkEmailRequest.getEmail() : {}", checkEmailRequest.getEmail());

        return SellerMapper.INSTANCE.toCheckEmailSellerResponse(
                sellerRepository.existsByEmail(checkEmailRequest.getEmail()));
    }

    public FindEmailSellerResponse findEmail(FindEmailSellerRequest findEmailSellerRequest) {

        log.info("findEmailSellerRequest.getPhoneNumber() : {}", findEmailSellerRequest.getPhoneNumber());

        return SellerMapper.INSTANCE.SellerToFindEmailSellerResponse(
                sellerRepository.findByPhoneNumber(findEmailSellerRequest.getPhoneNumber())
                        .orElseThrow(() -> new BusinessException(PHONE_NUMBER_NOT_FOUND)));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        log.info("email : {}", email);

        return new SellerCustomUserDetails(
                sellerRepository.findByEmail(email)
                        .orElseThrow(() -> new BusinessException(EMAIL_NOT_FOUND)));
    }
}
