package com.todayeat.backend.review.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.review.dto.request.CreateReviewRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Tag(name = "reviews", description = "리뷰")
@RequestMapping("/api/reviews")
public interface ReviewControllerDocs {

    @Operation(summary = "리뷰 등록",
            description = """
                    `ROLE_CONSUMER` \n
                    request body 넣어주세요.
                    """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = """
                              가게가 존재 하지 않는 경우 \n
                              주문이 존재 하지 않는 경우 
                          """,
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    SuccessResponse<Void> create(@ModelAttribute @Valid CreateReviewRequest request);
}
