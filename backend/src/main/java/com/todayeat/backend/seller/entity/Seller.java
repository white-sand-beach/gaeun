package com.todayeat.backend.seller.entity;

import com.todayeat.backend._common.entity.BaseTime;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE seller SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE seller_id = ?")
public class Seller extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seller_id")
    private Long id;

    @NotEmpty
    @Column(nullable = false, length = 50)
    @Pattern(regexp = "^[_A-Za-z0-9-+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z]+(\\.[A-Za-z]{2,})$", message = "올바른 이메일 형식이 아닙니다.")
    private String email;

    @NotEmpty
    @Column(nullable = false)
    private String password;

    @NotEmpty
    @Column(nullable = false)
    @Pattern(regexp = "[0-9]+", message = "숫자만 입력해주세요.")
    private String phoneNumber;
}
