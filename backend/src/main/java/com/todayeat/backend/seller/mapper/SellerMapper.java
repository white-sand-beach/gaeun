package com.todayeat.backend.seller.mapper;

import com.todayeat.backend.seller.dto.request.SignupSellerRequest;
import com.todayeat.backend.seller.dto.response.*;
import com.todayeat.backend.seller.entity.Seller;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SellerMapper {

    SellerMapper INSTANCE = Mappers.getMapper(SellerMapper.class);

    @Mapping(target = "password", qualifiedByName = "encodePassword")
    Seller signupSellerRequestToSeller(SignupSellerRequest signupSellerRequest, @Context PasswordEncoder passwordEncoder);

    @Mapping(target = "isValid", source = "isValid")
    CheckEmailSellerResponse toCheckEmailSellerResponse(Boolean isValid);

    @Mapping(target = "isValid", source = "isValid")
    CheckRegisteredNoSellerResponse toCheckRegisteredNoSellerResponse(Boolean isValid);

    default FindEmailSellerResponse sellerListToFindEmailSellerResponse(List<Seller> sellerList) {
        List<String> emails = sellerList.stream()
                .map(Seller::getEmail)
                .collect(Collectors.toList());
        FindEmailSellerResponse findEmailSellerResponse = new FindEmailSellerResponse();
        findEmailSellerResponse.setEmailList(emails);
        return findEmailSellerResponse;
    }

    @Mapping(target = "isValid", source = "isValid")
    CheckTempPasswordSellerResponse toCheckTempPasswordSellerResponse(Boolean isValid);

    @Mapping(target = "storeId", source = "seller.store.id")
    GetSellerResponse sellerToGetSellerResponse(Seller seller);

    @Named("encodePassword")
    default String encodePassword(String password, @Context PasswordEncoder passwordEncoder) {

        return passwordEncoder.encode(password);
    }
}
