package com.todayeat.backend.sale.repository;

import com.todayeat.backend.sale.entity.Sale;
import com.todayeat.backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Optional<Sale> findByIdAndStoreIdAndMenuIdAndDeletedAtIsNullAndStoreDeletedAtIsNullAndMenuDeletedAtIsNull(Long saleId, Long storeId, Long menuId);

    Optional<Sale> findByIdAndStoreAndIsFinishedIsFalseAndDeletedAtIsNull(Long saleId, Store store);

    Optional<Sale> findByIdAndDeletedAtIsNull(Long saleId);

    List<Sale> findAllByStoreAndDeletedAtIsNull(Store store);

    List<Sale> findAllByStoreAndIsFinishedIsFalseAndDeletedAtIsNull(Store store);
}
