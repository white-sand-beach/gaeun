package com.todayeat.backend.favorite.repository;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.favorite.entity.Favorite;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByConsumerAndStoreAndDeletedAtIsNull(Consumer consumer, Store store);
}
