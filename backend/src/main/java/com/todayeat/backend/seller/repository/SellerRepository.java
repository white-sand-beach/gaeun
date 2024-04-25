package com.todayeat.backend.seller.repository;

import com.todayeat.backend.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SellerRepository extends JpaRepository<Seller, Long> {

    Boolean existsByEmail(String email);
}
