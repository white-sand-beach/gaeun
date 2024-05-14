package com.todayeat.backend.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
@Schema(name = "UpdateStatusSellerRequest", description = "판매자 주문 상태 변경 요청")
public class UpdateStatusSellerRequest {

    @NotBlank(message = "status: 빈 값이 아니어야 합니다.")
    @Schema(description = """
                          주문 상태 \n
                          - IN_PROGRESS: 수락 (준비중)
                          - DENIED: 거절
                          - CANCEL: 취소 (수락 이후)
                          - PREPARED: 준비 완료
                          - FINISHED: 수령 완료
                          """,
            example = "IN_PROGRESS")
    private String status;

    @Schema(description = """
                          소요 시간 (분) \n
                          소비자가 음식을 수령하기까지 걸리는 예상 시간입니다. \n
                          status == `IN_PROGRESS` 일 때만 값을 넣어주세요.
                          """,
            example = "30")
    private Integer takenTime;
}
