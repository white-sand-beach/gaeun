package com.todayeat.backend.review.mapper;

import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.review.dto.request.CreateReviewRequest;
import com.todayeat.backend.review.entity.Review;
import com.todayeat.backend.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    Review createReviewRequestToMenu(CreateReviewRequest createReviewRequest, String imageUrl, Consumer consumer, Store store);
}
