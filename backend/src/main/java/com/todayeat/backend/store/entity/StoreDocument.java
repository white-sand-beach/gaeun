package com.todayeat.backend.store.entity;

import com.todayeat.backend.category.dto.CategoryInfo;
import com.todayeat.backend.sale.dto.SaleInfo;
import com.todayeat.backend.seller.entity.Location;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(indexName = "store")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreDocument {

    @Id
    @Field(type = FieldType.Long)
    private Long id;

    @Field(type = FieldType.Text)
    private String registeredName;

    @Field(type = FieldType.Text)
    private String bossName;

    @Field(type = FieldType.Text)
    private String address;

    @Field(type = FieldType.Text)
    private String roadAddress;

    private Location location;

    @Field(type = FieldType.Text)
    private String tel;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String imageURL;

    @Field(type = FieldType.Text)
    private String operatingTime;

    @Field(type = FieldType.Text)
    private String holiday;

    @Field(type = FieldType.Text)
    private String originCountry;

    @Field(type = FieldType.Text)
    private String introduction;

    @Field(type = FieldType.Boolean)
    private boolean isOpened;

    @Field(type = FieldType.Integer)
    private int reviewCnt;

    @Field(type = FieldType.Integer)
    private int favoriteCnt;

    @Field(type = FieldType.Nested)
    private List<CategoryInfo> categoryList = new ArrayList<>();

    @Field(type = FieldType.Nested)
    private List<SaleInfo> saleList = new ArrayList<>();
}
