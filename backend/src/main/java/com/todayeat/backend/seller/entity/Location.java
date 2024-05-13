package com.todayeat.backend.seller.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@Embeddable
@NoArgsConstructor
public class Location {

    @Column(precision = 9, scale = 6, nullable = false)
    private BigDecimal lat;

    @Column(precision = 9, scale = 6, nullable = false)
    private BigDecimal lon;

    @Builder
    private Location(BigDecimal lat, BigDecimal lon) {
        this.lat = lat;
        this.lon = lon;
    }

    static public Location of(BigDecimal lat, BigDecimal lon) {
        return builder()
                .lat(lat)
                .lon(lon)
                .build();
    }
}
