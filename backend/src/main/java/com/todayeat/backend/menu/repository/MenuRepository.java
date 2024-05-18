package com.todayeat.backend.menu.repository;

import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findAllByStoreAndDeletedAtIsNullOrderByUpdatedAtAsc(Store store);

    Optional<Menu> findByIdAndDeletedAtIsNull(Long menuId);

    Optional<Menu> findByIdAndStoreAndDeletedAtIsNullAndStoreDeletedAtIsNull(Long id, Store store);

    @Modifying
    @Query("UPDATE Menu m SET m.imageUrl = :imageUrl, m.name = :name, m.originalPrice = :originalPrice, m.sellPrice = :sellPrice, m.discountRate = :discountRate WHERE m.id = :id")
    void updateMenu(Long id, String imageUrl, String name, Integer originalPrice, Integer sellPrice, Integer discountRate);
}
