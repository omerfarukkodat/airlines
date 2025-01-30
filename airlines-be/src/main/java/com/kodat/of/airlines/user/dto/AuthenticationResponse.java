package com.kodat.of.airlines.user.dto;

import com.kodat.of.airlines.user.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
}
