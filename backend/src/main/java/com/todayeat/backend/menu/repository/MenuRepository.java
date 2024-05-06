package com.todayeat.backend.menu.repository;

import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findAllByStoreAndDeletedAtIsNullOrderBySequenceAscUpdatedAtDesc(Store store);
}
