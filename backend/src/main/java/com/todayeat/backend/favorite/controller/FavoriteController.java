package com.todayeat.backend.favorite.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.favorite.dto.request.CreateFavoriteRequest;
import com.todayeat.backend.favorite.dto.request.DeleteFavoriteRequest;
import com.todayeat.backend.favorite.dto.response.GetFavoriteListResponse;
import com.todayeat.backend.favorite.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class FavoriteController implements FavoriteControllerDocs {

    private final FavoriteService favoriteService;

    @Override
    public SuccessResponse<Void> create(CreateFavoriteRequest request) {

        favoriteService.create(request);
        return SuccessResponse.of(CREATE_FAVORITE_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> deleteByFavoriteId(Long favoriteId) {

        favoriteService.deleteByFavoriteId(favoriteId);
        return SuccessResponse.of(DELETE_FAVORITE_SUCCESS);
    }

    @Override
    public SuccessResponse<Void> deleteByStoreId(DeleteFavoriteRequest request) {

        favoriteService.deleteByStoreId(request);
        return SuccessResponse.of(DELETE_FAVORITE_SUCCESS);
    }

    @Override
    public SuccessResponse<GetFavoriteListResponse> getList(Integer page, Integer size) {

        return SuccessResponse.of(favoriteService.getList(page, size), GET_FAVORITES_SUCCESS);
    }
}
