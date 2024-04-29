package com.todayeat.backend._common.entity;

import lombok.Getter;

@Getter
public enum DirectoryType {

    //seller
    SELLER_STORE_IMAGE("seller", "store-image"),
    SELLER_MENU_IMAGE("seller", "menu-image"),
    SELLER_SALE_IMAGE("seller", "sale-image"),

    //consumer
    CONSUMER_PROFILE_IMAGE("consumer", "profile-image"),
    CONSUMER_REVIEW_IMAGE("consumer", "review-image"),

    //admin
    ADMIN_CATEGORY_IMAGE("admin", "category-image"),
    ;

    private final String dirNamePrincipal; //권한 가진 주체

    private final String dirNameAttribute; //엔티티 속성

    DirectoryType(String dirNamePrincipal, String dirNameAttribute) {
        this.dirNamePrincipal = dirNamePrincipal;
        this.dirNameAttribute = dirNameAttribute;
    }
}
