package com.kodat.of.airlines.user.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String locatedCity;
}
