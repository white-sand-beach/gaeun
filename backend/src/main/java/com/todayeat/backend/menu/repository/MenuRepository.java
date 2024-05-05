package com.todayeat.backend.menu.repository;

import com.todayeat.backend.menu.entitiy.Menu;
import com.todayeat.backend.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {

}
