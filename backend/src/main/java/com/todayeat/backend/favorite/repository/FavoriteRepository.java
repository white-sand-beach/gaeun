package com.todayeat.backend.favorite.repository;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByConsumerAndStoreAndDeletedAtIsNull(Consumer consumer, Store store);
    Optional<Favorite> findByIdAndDeletedAtIsNull(Long favoriteId);
    Page<Favorite> findAllByConsumerAndDeletedAtIsNull(Consumer consumer, Pageable pageable);
}
