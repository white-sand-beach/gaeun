package com.todayeat.backend.seller.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.MailUtil;
import com.todayeat.backend.seller.dto.SellerCustomUserDetails;
import com.todayeat.backend.seller.dto.request.*;
import com.todayeat.backend.seller.dto.response.CheckEmailSellerResponse;
import com.todayeat.backend.seller.dto.response.CheckTempPasswordSellerResponse;
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

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerService implements UserDetailsService {

    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailUtil mailUtil;

    public void signup(SignupSellerRequest signupSellerRequest) {

        log.info("signupSellerRequest.getEmail() : {}", signupSellerRequest.getEmail());

        if (sellerRepository.existsByEmail(signupSellerRequest.getEmail())) {

            throw new BusinessException(EMAIL_CONFLICT);
        }

        sellerRepository.save(SellerMapper.INSTANCE.signupSellerRequestToSeller(signupSellerRequest, passwordEncoder));
    }

    public CheckEmailSellerResponse checkEmail(CheckEmailSellerRequest checkEmailSellerRequest) {

        log.info("checkEmailRequest.getEmail() : {}", checkEmailSellerRequest.getEmail());

        return SellerMapper.INSTANCE.toCheckEmailSellerResponse(
                sellerRepository.existsByEmail(checkEmailSellerRequest.getEmail()));
    }

    public FindEmailSellerResponse findEmail(FindEmailSellerRequest findEmailSellerRequest) {

        log.info("findEmailSellerRequest.getPhoneNumber() : {}", findEmailSellerRequest.getPhoneNumber());

        return SellerMapper.INSTANCE.SellerToFindEmailSellerResponse(
                sellerRepository.findByPhoneNumber(findEmailSellerRequest.getPhoneNumber())
                        .orElseThrow(() -> new BusinessException(PHONE_NUMBER_NOT_FOUND)));
    }

    public void getTempPassword(GetTempPasswordSellerRequest getTempPasswordSellerRequest) {

        log.info("getTempPasswordSellerRequest.getEmail() : {}", getTempPasswordSellerRequest.getEmail());

        Seller seller = sellerRepository.findByPhoneNumber(getTempPasswordSellerRequest.getPhoneNumber())
                .orElseThrow(() -> new BusinessException(PHONE_NUMBER_NOT_FOUND));

        if (!seller.getEmail().equals(getTempPasswordSellerRequest.getEmail())) {

            throw new BusinessException(EMAIL_UNAUTHORIZED);
        }

        sendCertification(getTempPasswordSellerRequest.getEmail());
    }

    public CheckTempPasswordSellerResponse checkTempPassword(CheckTempPasswordSellerRequest checkTempPasswordSellerRequest) {

        log.info("checkTempPasswordSellerRequest.getTempPassword() : {}", checkTempPasswordSellerRequest.getTempPassword());

        if (sellerRepository.existsByEmail(checkTempPasswordSellerRequest.getEmail())) {

            throw new BusinessException(EMAIL_CONFLICT);
        }

        // todo redis에서 비교
        
        // todo 임시 비밀번호로 비밀번호 업데이트

        return null;
    }

    private void sendCertification(String email) {

        String title = "today-eat 이메일 인증 번호";
        String authCode = createCode();

        log.info("authCode : {}", authCode);

        mailUtil.sendEmail(email, title, "<h3>인증코드</h3>" + authCode);

        // todo redis에 저장
    }

    private String createCode() {
        int length = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < length; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new BusinessException(MAIL_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        log.info("email : {}", email);

        return new SellerCustomUserDetails(
                sellerRepository.findByEmail(email)
                        .orElseThrow(() -> new BusinessException(EMAIL_NOT_FOUND)));
    }
}
