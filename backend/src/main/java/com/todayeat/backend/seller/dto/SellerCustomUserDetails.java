package com.todayeat.backend.seller.dto;

import com.todayeat.backend.seller.entity.Seller;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class SellerCustomUserDetails implements UserDetails {

    private final Seller seller;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return "ROLE_SELLER";
            }
        });

        return collection;
    }

    public Long getId() {

        return seller.getId();
    }

    public String getEmail() {

        return seller.getEmail();
    }

    public String getPhoneNumber() {

        return seller.getPhoneNumber();
    }

    @Override
    public String getPassword() {

        return seller.getPassword();
    }

    @Override
    public String getUsername() {

        return null;
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }
}
