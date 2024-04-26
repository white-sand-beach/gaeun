package com.todayeat.backend.seller.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend.seller.dto.SellerCustomUserDetails;
import com.todayeat.backend.seller.dto.request.CheckEmailRequest;
import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
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

import static com.todayeat.backend._common.response.error.ErrorType.EMAIL_CONFLICT;
import static com.todayeat.backend._common.response.error.ErrorType.EMAIL_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerService implements UserDetailsService {

    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(SignupSellerRequest signupSellerRequest) {

        log.info("[SellerAuthService.signup]");

        if (sellerRepository.existsByEmail(signupSellerRequest.getEmail())) {

            throw new BusinessException(EMAIL_CONFLICT);
        }

        Seller seller = SellerMapper.INSTANCE.signupSellerRequestToSeller(signupSellerRequest, passwordEncoder);

        log.info("seller.getEmail(): {}", seller.getEmail());

        sellerRepository.save(seller);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        log.info("[SellerAuthService.loadUserByUsername]");

        Seller seller = sellerRepository.findByEmail(email);

        log.info("seller.getEmail(): {}", seller.getEmail());

        if (seller == null) {

            throw new BusinessException(EMAIL_NOT_FOUND);
        }

        return new SellerCustomUserDetails(seller);
    }

    public Boolean checkEmail(CheckEmailRequest checkEmailRequest) {

        if (sellerRepository.existsByEmail(checkEmailRequest.getEmail())) {

            return false;
        }

        return true;
    }
}
