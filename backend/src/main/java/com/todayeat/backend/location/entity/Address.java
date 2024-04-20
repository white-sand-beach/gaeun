package com.todayeat.backend.location.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Embeddable
public class Address {

    @NotEmpty
    @Size(max = 255)
    @Column(nullable = false)
    private String address;

    @NotNull
    @Column(nullable = false)
    @DecimalMin(value = "33", inclusive = true)
    @DecimalMax(value = "38", inclusive = true)
    private BigDecimal latitude;

    @NotNull
    @Column(nullable = false)
    @DecimalMin(value = "124", inclusive = true)
    @DecimalMax(value = "132", inclusive = true)
    private BigDecimal longitude;
}
