package com.todayeat.backend.location.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.location.dto.request.CreateLocationRequest;
import com.todayeat.backend.location.dto.request.UpdateLocationRequest;
import com.todayeat.backend.location.dto.response.GetLocationResponse;
import com.todayeat.backend.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.todayeat.backend._common.response.success.SuccessType.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LocationController implements LocationControllerDocs {

    private final LocationService locationService;

    @Override
    public SuccessResponse<Void> create(CreateLocationRequest request) {

        locationService.create(request);
        return SuccessResponse.of(CREATE_LOCATION_SUCCESS);
    }

    @Override
    public SuccessResponse<List<GetLocationResponse>> getList() {

        return SuccessResponse.of(locationService.getList(), GET_LOCATIONS_SUCCESS);
    }

    @Override
    public SuccessResponse<GetLocationResponse> getSelected() {

        return SuccessResponse.of(locationService.getSelected(), GET_SELECTED_LOCATION_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> update(Long locationId, UpdateLocationRequest request) {

        locationService.update(locationId, request);
        return SuccessResponse.of(UPDATE_LOCATION_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> updateSelected(Long locationId) {

        locationService.updateSelected(locationId);
        return SuccessResponse.of(UPDATE_SELECTED_LOCATION_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> delete(Long locationId) {

        locationService.delete(locationId);
        return SuccessResponse.of(DELETE_LOCATION_SUCCESS);
    }
}
