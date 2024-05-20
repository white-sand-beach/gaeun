package com.todayeat.backend.sale.repository;

import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Optional<Sale> findByIdAndStoreIdAndMenuIdAndDeletedAtIsNullAndStoreDeletedAtIsNullAndMenuDeletedAtIsNull(Long saleId, Long storeId, Long menuId);

    Optional<Sale> findByIdAndStoreAndIsFinishedIsFalseAndDeletedAtIsNull(Long saleId, Store store);

    Optional<Sale> findByIdAndDeletedAtIsNull(Long saleId);

    Optional<Sale> findByIdAndIsFinishedIsFalseAndDeletedAtIsNull(Long saleId);

    List<Sale> findAllByStoreAndDeletedAtIsNull(Store store);

    List<Sale> findAllByStoreAndIsFinishedIsFalseAndDeletedAtIsNull(Store store);

    List<Sale> findAllByStoreIdAndIsFinishedIsFalseAndDeletedAtIsNull(Long storeId);

    @Modifying
    @Query("UPDATE Sale s SET s.isFinished = true WHERE s.store = :store AND s.isFinished = false AND s.deletedAt IS NULL")
    void updateAllSalesAsFinishedForStore(@Param("store") Store store);
}
