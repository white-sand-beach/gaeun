package com.todayeat.backend.category.repository;

import com.todayeat.backend.category.entity.StoreCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreCategoryRepository extends JpaRepository<StoreCategory, Long> {

    List<StoreCategory> findByStoreIdAndDeletedAtIsNull(Long storeId);
}
