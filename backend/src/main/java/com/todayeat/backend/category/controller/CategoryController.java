package com.todayeat.backend.category.controller;

import com.todayeat.backend._common.response.success.SuccessResponse;
import com.todayeat.backend.category.dto.request.CreateCategoryRequest;
import com.todayeat.backend.category.dto.response.GetCategoryListResponse;
import com.todayeat.backend.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import static com.todayeat.backend._common.response.success.SuccessType.CREATE_CATEGORY_SUCCESS;
import static com.todayeat.backend._common.response.success.SuccessType.GET_CATEGORY_LIST_SUCCESS;

@RestController
@RequiredArgsConstructor
public class CategoryController implements CategoryControllerDocs {

    private final CategoryService categoryService;

    @Override
    public SuccessResponse<Void> create(CreateCategoryRequest createCategoryRequest) {

        categoryService.create(createCategoryRequest);
        return SuccessResponse.of(CREATE_CATEGORY_SUCCESS);
    }

    @Override
    public SuccessResponse<GetCategoryListResponse> get() {

        return SuccessResponse.of(categoryService.get(), GET_CATEGORY_LIST_SUCCESS);
    }
}
