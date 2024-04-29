package com.todayeat.backend.location.controller;

import com.todayeat.backend._common.response.error.ErrorResponse;
import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.location.dto.request.CreateLocationRequest;
import com.todayeat.backend.location.dto.request.UpdateLocationRequest;
import com.todayeat.backend.location.dto.response.GetLocationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "locations", description = "위치")
@RequestMapping("/api/locations")
public interface LocationControllerDocs {

    @Operation(summary = "위치 등록",
            description = """
                          `ROLE_CONSUMER` \n
                          request body 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "409",
            description = "위도, 경도 중복",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    @PostMapping
    SuccessResponse<Void> create(@RequestBody @Valid CreateLocationRequest request);

    @Operation(summary = "위치 목록 조회",
            description = """
                          `ROLE_CONSUMER`
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = GetLocationResponse.class))))
    @GetMapping
    SuccessResponse<List<GetLocationResponse>> getList();

    @Operation(summary = "선택된 위치 조회",
            description = """
                          `ROLE_CONSUMER`
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공",
            content = @Content(schema = @Schema(implementation = GetLocationResponse.class)))
    @GetMapping("/selected")
    SuccessResponse<GetLocationResponse> getSelected();

    @Operation(summary = "위치 수정",
            description = """
                          `ROLE_CONSUMER` \n
                          path variable로 location-id 넣어주세요. \n
                          request body 넣어주세요.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "위치 조회 정보 없음",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ErrorResponse.class))))
    @PutMapping("/{location-id}")
    SuccessResponse<Void> update(@PathVariable("location-id") Long locationId, @RequestBody @Valid UpdateLocationRequest request);

    @Operation(summary = "위치 선택",
            description = """
                          `ROLE_CONSUMER` \n
                          path variable로 location-id 넣어주세요. \n
                          기존에 선택되어 있던 위치의 선택을 해제하고, location-id를 선택합니다.
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "위치 조회 정보 없음",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ErrorResponse.class))))
    @PutMapping("/{location-id}/selected")
    SuccessResponse<Void> updateSelected(@PathVariable("location-id") Long locationId);

    @Operation(summary = "위치 삭제",
            description = """
                          `ROLE_CONSUMER` \n
                          path variable로 location-id 넣어주세요. \n
                          """)
    @ApiResponse(responseCode = "200",
            description = "성공")
    @ApiResponse(responseCode = "404",
            description = "위치 조회 정보 없음",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ErrorResponse.class))))
    @DeleteMapping("/{location-id}")
    SuccessResponse<Void> delete(@PathVariable("location-id") Long locationId);
}
