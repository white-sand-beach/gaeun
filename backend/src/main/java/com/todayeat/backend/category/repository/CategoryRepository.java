package com.todayeat.backend.category.repository;

import com.todayeat.backend.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Boolean existsByName(String name);
}
