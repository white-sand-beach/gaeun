package com.todayeat.backend._common.notification.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.consumer.entity.Consumer;
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
@SQLDelete(sql = "UPDATE consumer_notification SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE consumer_notification_id = ?")
public class ConsumerNotification extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consumer_notification_id")
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
    @JoinColumn(name = "consumer_id")
    private Consumer consumer;

    @Builder
    private ConsumerNotification(String type, Long typeId, String content, Boolean isRead, Consumer consumer) {
        this.type = type;
        this.typeId = typeId;
        this.content = content;
        this.isRead = isRead;
        this.consumer = consumer;
    }

    public static ConsumerNotification of(String type, Long typeId, String content, Consumer consumer) {
        return builder()
                .type(type)
                .typeId(typeId)
                .content(content)
                .isRead(false)
                .consumer(consumer)
                .build();
    }

    public void isReadTrue() {
        this.isRead = true;
    }
}
