package com.todayeat.backend.location.repository;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {

    Optional<Location> findByConsumerAndIsSelectedIsTrueAndDeletedAtIsNull(Consumer consumer);

    boolean existsByConsumerAndCoordinate_LatitudeAndCoordinate_LongitudeAndDeletedAtIsNull(Consumer consumer, BigDecimal latitude, BigDecimal longitude);
}
