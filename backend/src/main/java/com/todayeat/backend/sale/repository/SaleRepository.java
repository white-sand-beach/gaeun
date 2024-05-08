package com.todayeat.backend.sale.repository;

import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Optional<Sale> findByIdAndStoreIdAndMenuIdAndDeletedAtIsNullAndStoreDeletedAtIsNullAndMenuDeletedAtIsNull(Long saleId, Long storeId, Long menuId);

    List<Sale> findAllByStoreAndDeletedAtIsNull(Store store);

    List<Sale> findAllByStoreAndIsFinishedIsFalseAndDeletedAtIsNull(Store store);
}
