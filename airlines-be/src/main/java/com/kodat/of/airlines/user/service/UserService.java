package com.kodat.of.airlines.user.service;

import com.kodat.of.airlines.user.dto.AuthenticationResponse;
import com.kodat.of.airlines.user.dto.LoginDto;
import com.kodat.of.airlines.user.dto.RegisterDto;

public interface UserService {

    void register(RegisterDto registerDto);

    AuthenticationResponse login(LoginDto loginDto);
}
