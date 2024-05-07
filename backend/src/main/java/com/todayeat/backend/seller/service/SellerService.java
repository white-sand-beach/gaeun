package com.todayeat.backend.seller.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.MailUtil;
import com.todayeat.backend._common.util.RedisUtil;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.seller.dto.SellerCustomUserDetails;
import com.todayeat.backend.seller.dto.request.*;
import com.todayeat.backend.seller.dto.response.*;
import com.todayeat.backend.seller.entity.Seller;
import com.todayeat.backend.seller.mapper.SellerMapper;
import com.todayeat.backend.seller.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

import static com.todayeat.backend._common.response.error.ErrorType.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SellerService implements UserDetailsService {

    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityUtil securityUtil;
    private final RedisUtil redisUtil;
    private final MailUtil mailUtil;

    @Value("${spring.mail.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;

    private static final String AUTH_CODE_PREFIX = "AuthCode ";

    @Transactional
    public void signup(SignupSellerRequest signupSellerRequest) {

        log.info("signupSellerRequest.getEmail() : {}", signupSellerRequest.getEmail());

        if (sellerRepository.existsByEmail(signupSellerRequest.getEmail())) {

            throw new BusinessException(EMAIL_CONFLICT);
        }

        if (sellerRepository.existsByRegisteredNo(signupSellerRequest.getRegisteredNo())) {

            throw new BusinessException(REGISTEREDNO_CONFLICT);
        }

        sellerRepository.save(SellerMapper.INSTANCE.signupSellerRequestToSeller(signupSellerRequest, passwordEncoder));
    }

    public CheckEmailSellerResponse checkEmail(CheckEmailSellerRequest checkEmailSellerRequest) {

        log.info("checkEmailRequest.getEmail() : {}", checkEmailSellerRequest.getEmail());

        return SellerMapper.INSTANCE.toCheckEmailSellerResponse(
                sellerRepository.existsByEmail(checkEmailSellerRequest.getEmail()));
    }

    public CheckRegisteredNoSellerResponse checkRegisteredNo(CheckRegisteredNoSellerRequest checkRegisteredNoSellerRequest) {

        log.info("checkRegisteredNoSellerRequest.getRegisteredNo() : {}", checkRegisteredNoSellerRequest.getRegisteredNo());

        return SellerMapper.INSTANCE.toCheckRegisteredNoSellerResponse(
                sellerRepository.existsByRegisteredNo(checkRegisteredNoSellerRequest.getRegisteredNo()));
    }

    public FindEmailSellerResponse findEmail(FindEmailSellerRequest findEmailSellerRequest) {

        log.info("findEmailSellerRequest.getPhoneNumber() : {}", findEmailSellerRequest.getPhoneNumber());

        List<Seller> sellerList = sellerRepository.findByPhoneNumber(findEmailSellerRequest.getPhoneNumber());

        if (sellerList.isEmpty()) {

            throw new BusinessException(PHONE_NUMBER_NOT_FOUND);
        }

        return SellerMapper.INSTANCE.sellerListToFindEmailSellerResponse(sellerList);
    }

    @Transactional
    public void createTempPassword(CreateTempPasswordSellerRequest createTempPasswordSellerRequest) {

        log.info("createTempPasswordSellerRequest.getEmail() : {}", createTempPasswordSellerRequest.getEmail());

        List<Seller> sellerList = sellerRepository.findByPhoneNumber(createTempPasswordSellerRequest.getPhoneNumber());

        Seller seller = sellerList.stream()
                .filter(s -> s.getEmail().equals(createTempPasswordSellerRequest.getEmail()))
                .findFirst()
                .orElseThrow(() -> new BusinessException(EMAIL_UNAUTHORIZED));

        log.info("seller : {}", seller.getEmail());

        String authCode = createCode();

        log.info("authCode : {}", authCode);

        sendCertification(seller.getEmail(), authCode);

        redisUtil.setKeyValue(AUTH_CODE_PREFIX + seller.getEmail(),
                authCode, authCodeExpirationMillis);
    }

    @Transactional
    public CheckTempPasswordSellerResponse checkTempPassword(CheckTempPasswordSellerRequest checkTempPasswordSellerRequest) {

        log.info("checkTempPasswordSellerRequest.getTempPassword() : {}", checkTempPasswordSellerRequest.getTempPassword());

        Seller seller = sellerRepository.findByEmail(checkTempPasswordSellerRequest.getEmail())
                .orElseThrow(() -> new BusinessException(EMAIL_NOT_FOUND));

        String authCode = redisUtil.getValueByKey(AUTH_CODE_PREFIX + checkTempPasswordSellerRequest.getEmail());

        log.info("authCode : {}", authCode);

        if (authCode == null) {

            throw new BusinessException(TEMP_PASSWORD_NOT_FOUND);
        }

        boolean passwordMatches = authCode.equals(checkTempPasswordSellerRequest.getTempPassword());

        log.info("passwordMatches : {}", passwordMatches);

        if (passwordMatches) {

            seller.updatePassword(passwordEncoder.encode(authCode));
        }

        return SellerMapper.INSTANCE.toCheckTempPasswordSellerResponse(passwordMatches);
    }

    public GetSellerResponse getInfo() {

        return SellerMapper.INSTANCE.sellerToGetSellerResponse(securityUtil.getSeller());
    }

    @Transactional
    public void updatePassword(UpdatePasswordSellerRequest updatePasswordSellerRequest) {

        if (!updatePasswordSellerRequest.getNewPassword().equals(updatePasswordSellerRequest.getCheckPassword())) {

            throw new BusinessException(NEW_CHECK_PASSWORD_BAD_REQUEST);
        }

        if (updatePasswordSellerRequest.getOldPassword().equals(updatePasswordSellerRequest.getNewPassword())) {

            throw new BusinessException(NEW_PASSWORD_BAD_REQUEST);
        }

        Seller seller = securityUtil.getSeller();

        String oldPassword = passwordEncoder.encode(updatePasswordSellerRequest.getOldPassword());
        if (!seller.getPassword().equals(oldPassword)) {

            throw new BusinessException(PASSWORD_UNAUTHORIZED);
        }

        String newPassword = passwordEncoder.encode(updatePasswordSellerRequest.getNewPassword());
        seller.updatePassword(newPassword);
    }

    @Transactional
    public void updatePhoneNumber(UpdatePhoneNumberSellerRequest updatePhoneNumberSellerRequest) {

        securityUtil.getSeller().updatePhoneNumber(updatePhoneNumberSellerRequest.getPhoneNumber());
    }

    private void sendCertification(String email, String authCode) {

        String title = "today-eat 이메일 인증 번호";
        String text = "<h3>인증코드</h3>" + authCode;

        mailUtil.sendEmail(email, title, text);
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
