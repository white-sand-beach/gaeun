package com.todayeat.backend.favorite.repository;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Boolean existsByConsumerAndStoreAndDeletedAtIsNull(Consumer consumer, Store store);

    Boolean existsByConsumerAndStoreIdAndDeletedAtIsNull(Consumer consumer, Long storeId);

    Optional<Favorite> findByIdAndDeletedAtIsNull(Long favoriteId);

    Page<Favorite> findAllByConsumerAndDeletedAtIsNull(Consumer consumer, Pageable pageable);
    
    Optional<Favorite> findByStoreIdAndConsumerIdAndDeletedAtIsNull(Long storeId, Long consumerId);

    List<Favorite> findAllByStoreIdAndDeletedAtIsNull(Long storeId);
}
