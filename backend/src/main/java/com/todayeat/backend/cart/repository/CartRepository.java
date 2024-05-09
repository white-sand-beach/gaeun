package com.todayeat.backend.cart.repository;

import com.todayeat.backend.cart.entity.Cart;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CartRepository extends CrudRepository<Cart, String> {

    Optional<Cart> findByConsumerIdAndSaleId(Long consumerId, Long saleId);
}
