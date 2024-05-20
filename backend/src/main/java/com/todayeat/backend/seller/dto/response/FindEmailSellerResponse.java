package com.todayeat.backend.seller.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(name = "판매자 아이디(이메일) 확인 응답")
public class FindEmailSellerResponse {

    @Schema(description = "이메일 리스트", example = "[\"example1@domain.com\", \"example2@domain.com\"]")
    private List<String> emailList;
}
