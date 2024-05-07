package com.todayeat.backend.seller.entity;

import com.todayeat.backend._common.entity.BaseTime;
import com.todayeat.backend.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE seller SET deleted_at = CONVERT_TZ(NOW(), '+00:00', '+09:00') WHERE seller_id = ?")
public class Seller extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seller_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false, length = 10)
    private String registeredNo;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "store_id", nullable = true)
    private Store store;

    @Builder
    private Seller(String email, String password, String phoneNumber, String registeredNo) {
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.registeredNo = registeredNo;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updatePhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void updateStore(Store store) {
        this.store = store;
    }
}
