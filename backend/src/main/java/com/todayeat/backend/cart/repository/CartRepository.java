package com.todayeat.backend.cart.repository;

import com.todayeat.backend.cart.entity.Cart;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends CrudRepository<Cart, String> {

    List<Cart> findAllByConsumerId(Long consumerId);

    Optional<Cart> findByConsumerIdAndSaleId(Long consumerId, Long saleId);

    Optional<Cart> findById(Long cartId);
}
