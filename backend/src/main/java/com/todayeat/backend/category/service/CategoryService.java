package com.todayeat.backend.category.service;

import com.todayeat.backend._common.response.error.exception.BusinessException;
import com.todayeat.backend._common.util.S3Util;
import com.todayeat.backend.category.dto.request.CreateCategoryRequest;
import com.todayeat.backend.category.dto.response.GetCategoryListResponse;
import com.todayeat.backend.category.mapper.CategoryMapper;
import com.todayeat.backend.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

import static com.todayeat.backend._common.response.error.ErrorType.CATEGORY_CONFLICT;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    public final CategoryRepository categoryRepository;
    public final S3Util s3Util;

    @Transactional
    public void create(CreateCategoryRequest createCategoryRequest) {

        if (categoryRepository.existsByName(createCategoryRequest.getName())) {

            throw new BusinessException(CATEGORY_CONFLICT);
        }

        categoryRepository.save(CategoryMapper.INSTANCE.createCategoryRequestToCategory(createCategoryRequest, 1L, s3Util));
    }

    public GetCategoryListResponse get() {

        return GetCategoryListResponse.of(
                categoryRepository.findAll().stream()
                        .map(CategoryMapper.INSTANCE::categoryToCategoryInfo)
                        .collect(Collectors.toList()));
    }
}
