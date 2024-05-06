package com.todayeat.backend.location.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.SecurityUtil;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.location.dto.request.CreateLocationRequest;
import com.todayeat.backend.location.dto.request.UpdateLocationRequest;
import com.todayeat.backend.location.dto.response.GetLocationListResponse;
import com.todayeat.backend.location.entity.Location;
import com.todayeat.backend.location.mapper.LocationMapper;
import com.todayeat.backend.location.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.todayeat.backend._common.response.error.ErrorType.LOCATION_CONFLICT;
import static com.todayeat.backend._common.response.error.ErrorType.LOCATION_NOT_FOUND;

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
        if (locationRepository
                .existsByConsumerAndCoordinate_LatitudeAndCoordinate_LongitudeAndDeletedAtIsNull
                        (consumer, request.getLatitude(), request.getLongitude())) {
            throw new BusinessException(LOCATION_CONFLICT);
        }

        // dto -> entity
        Location location = LocationMapper.INSTANCE.createLocationRequestToLocation(consumer, request);

        // 저장
        locationRepository.save(location);
    }

    public GetLocationListResponse getList() {

        Consumer consumer = securityUtil.getConsumer();

        return GetLocationListResponse.of(
                locationRepository.findAllByConsumerAndDeletedAtIsNull(consumer)
                        .stream().map(LocationMapper.INSTANCE::locationToGetLocationResponse)
                        .toList());
    }

    @Transactional
    public void update(Long locationId, UpdateLocationRequest request) {

        Consumer consumer = securityUtil.getConsumer();

        // 해당 위치 찾기
        Location location = getLocationByIdAndConsumer(locationId, consumer);

        // 수정
        location.updateLocation(request);
    }

    @Transactional
    public void delete(Long locationId) {

        Consumer consumer = securityUtil.getConsumer();

        // 해당 위치 찾기
        Location location = getLocationByIdAndConsumer(locationId, consumer);

        // 삭제
        locationRepository.delete(location);
    }

    private Location getLocationByIdAndConsumer(Long locationId, Consumer consumer) {
        return locationRepository.findByIdAndConsumerAndDeletedAtIsNull(locationId, consumer)
                .orElseThrow(() -> new BusinessException(LOCATION_NOT_FOUND)); // 없으면 에러
    }
}
