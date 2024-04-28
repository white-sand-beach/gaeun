package com.todayeat.backend.store.repository;

import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StoreRepository extends JpaRepository<Store, Long> {

    Boolean existsByRegisteredNo(String registeredNo);
}
