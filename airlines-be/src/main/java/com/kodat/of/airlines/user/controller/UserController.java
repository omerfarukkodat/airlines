package com.kodat.of.airlines.user.controller;

import com.kodat.of.airlines.user.dto.AuthenticationResponse;
import com.kodat.of.airlines.user.dto.LoginDto;
import com.kodat.of.airlines.user.dto.RegisterDto;
import com.kodat.of.airlines.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class UserController {

    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDto registerDto) {

        userService.register(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User successfully registered");

    }



    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginDto loginDto) {

        return ResponseEntity.ok(userService.login(loginDto));
    }
}
