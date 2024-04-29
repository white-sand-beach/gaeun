package com.todayeat.backend.location.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.consumer.entity.Consumer;
import com.todayeat.backend.location.dto.request.UpdateLocationRequest;
import com.todayeat.backend.location.mapper.LocationMapper;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@ToString
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE location SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE location_id = ?")
public class Location extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long id;

    @Embedded
    private Coordinate coordinate;

    @Column(length = 10, nullable = true)
    private String alias;

    @Column(nullable = false)
    @ColumnDefault("true")
    private Boolean isSelected;

    @Column(nullable = false)
    @ColumnDefault("2")
    private Integer radius;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id", referencedColumnName = "consumer_id")
    private Consumer consumer;

    @Builder
    private Location(Coordinate coordinate, String alias, Boolean isSelected, Integer radius, Consumer consumer) {
        this.coordinate = coordinate;
        this.alias = alias;
        this.isSelected = isSelected;
        this.radius = radius;
        this.consumer = consumer;
    }

    public void updateIsSelected() {
        this.isSelected = !this.isSelected;
    }

    public void updateLocation(UpdateLocationRequest request) {
        this.coordinate = LocationMapper.INSTANCE.updateLocationRequestToCoordinate(request);
        this.alias = request.getAlias();
        this.radius = request.getRadius();
    }
}
