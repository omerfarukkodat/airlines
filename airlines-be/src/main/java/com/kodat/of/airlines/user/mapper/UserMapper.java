package com.kodat.of.airlines.user.mapper;


import com.kodat.of.airlines.user.User;
import com.kodat.of.airlines.user.dto.RegisterDto;
import com.kodat.of.airlines.user.dto.UserDto;
import com.kodat.of.airlines.user.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public  User toUser(RegisterDto registerDto) {

        return User.builder()
                .firstName(registerDto.getFirstName())
                .lastName(registerDto.getLastName())
                .username(registerDto.getUsername())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .locatedCity(registerDto.getLocatedCity().toLowerCase())
                .enabled(true)
                .accountLocked(false)
                .role(Role.USER)
                .build();
    }

    public UserDto toUserDto(User user) {

        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .locatedCity(user.getLocatedCity())
                .build();
    }








}
