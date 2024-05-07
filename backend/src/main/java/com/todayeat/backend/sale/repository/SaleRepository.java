package com.todayeat.backend.sale.repository;

import com.todayeat.backend.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
