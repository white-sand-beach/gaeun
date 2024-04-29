package com.todayeat.backend.location.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.location.dto.request.CreateLocationRequest;
import com.todayeat.backend.location.dto.response.GetLocationResponse;
import com.todayeat.backend.location.entity.Location;
import com.todayeat.backend.location.mapper.LocationMapper;
import com.todayeat.backend.location.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static com.todayeat.backend._common.response.error.ErrorType.LOCATION_CONFLICT;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationService {

    private final SecurityUtil securityUtil;
    private final LocationRepository locationRepository;

    @Transactional
    public void create(CreateLocationRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 위도, 경도가 같으면 중복 에러
        validateAddress(consumer, request.getLatitude(), request.getLongitude());

        // dto -> entity
        Location location = LocationMapper.INSTANCE.createLocationRequestToLocation(consumer, request);
        log.info("location: {}", location.toString());

        // 현재 기본 주소 -> false
        locationRepository.findByConsumerAndIsSelectedIsTrueAndDeletedAtIsNull(consumer)
                .ifPresent(Location::updateIsSelected);

        // 저장
        locationRepository.save(location);
    }

    public List<GetLocationResponse> getList() {
        Consumer consumer = securityUtil.getConsumer();

        return locationRepository.findAllByConsumerAndDeletedAtIsNull(consumer)
                .stream().map(LocationMapper.INSTANCE::locationToGetLocationResponse)
                .toList();
    }

    private void validateAddress(Consumer consumer, BigDecimal latitude, BigDecimal longitude) {
        if (locationRepository.existsByConsumerAndCoordinate_LatitudeAndCoordinate_LongitudeAndDeletedAtIsNull(consumer, latitude, longitude)) {
            throw new BusinessException(LOCATION_CONFLICT);
        }
    }
}
