package com.todayeat.backend.searchKeyword.entity;


import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Setter
@Document(indexName = "search_suggestions")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchSuggestionDocument {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String keyword;
}
