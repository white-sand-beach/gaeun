package com.todayeat.backend._common.notification.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.seller.entity.Seller;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE seller_notification SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE seller_notification_id = ?")
public class SellerNotification extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seller_notification_id")
    private Long id;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(nullable = false)
    private Long typeId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @Builder
    private SellerNotification(String type, Long typeId, String content, Boolean isRead, Seller seller) {
        this.type = type;
        this.typeId = typeId;
        this.content = content;
        this.isRead = isRead;
        this.seller = seller;
    }

    public static SellerNotification of(String type, Long typeId, String content, Seller seller) {
        return builder()
                .type(type)
                .typeId(typeId)
                .content(content)
                .isRead(false)
                .seller(seller)
                .build();
    }
}
