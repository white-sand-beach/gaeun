package com.todayeat.backend.location.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Embeddable
@NoArgsConstructor
public class Coordinate {

    @Column(length = 50, nullable = false)
    private String address;

    @Column(length = 50, nullable = false)
    private String roadAddress;

    @Column(precision = 9, scale = 6, nullable = false)
    private BigDecimal latitude;

    @Column(precision = 9, scale = 6, nullable = false)
    private BigDecimal longitude;

    @Builder
    private Coordinate(String address, String roadAddress, BigDecimal latitude, BigDecimal longitude) {
        this.address = address;
        this.roadAddress = roadAddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static public Coordinate of(String address, String roadAddress, BigDecimal latitude, BigDecimal longitude) {
        return builder()
                .address(address)
                .roadAddress(roadAddress)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
