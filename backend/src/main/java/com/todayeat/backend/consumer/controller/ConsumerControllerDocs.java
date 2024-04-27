package com.todayeat.backend.consumer.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.consumer.dto.request.UpdateConsumerRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "consumers", description = "소비자")
@RequestMapping("/api/consumers")
public interface ConsumerControllerDocs {

    @Operation(summary = "소비자 회원 정보 수정",
            description = """
                          사용자의 닉네임, 휴대폰 번호를 수정합니다. \n
                          request body 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
                description = "성공",
                useReturnTypeSchema = true)
    @PutMapping
    SuccessResponse update(@RequestBody @Valid UpdateConsumerRequest request);
}
