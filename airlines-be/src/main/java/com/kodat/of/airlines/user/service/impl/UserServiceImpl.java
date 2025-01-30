package com.kodat.of.airlines.user.service.impl;

import com.kodat.of.airlines.exception.UserAlreadyExistsException;
import com.kodat.of.airlines.exception.UserNotFoundException;
import com.kodat.of.airlines.security.JwtService;
import com.kodat.of.airlines.user.CustomUserDetails;
import com.kodat.of.airlines.user.User;
import com.kodat.of.airlines.user.dto.AuthenticationResponse;
import com.kodat.of.airlines.user.dto.LoginDto;
import com.kodat.of.airlines.user.dto.RegisterDto;
import com.kodat.of.airlines.user.mapper.UserMapper;
import com.kodat.of.airlines.user.repository.UserRepository;
import com.kodat.of.airlines.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public void register(RegisterDto registerDto) {
        checkIfUserExists(registerDto.getUsername());
        User user = userMapper.toUser(registerDto);
        userRepository.save(user);
        LOGGER.info("User: {} registered", user.getUsername());
    }

    private void checkIfUserExists(String username) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists in the system.");
        }
    }

    @Override
    public AuthenticationResponse login(LoginDto loginDto) {
        User user = findByUsername(loginDto.getUsername());
        String token = authenticationAndGenerateToken(loginDto, user);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    private String authenticationAndGenerateToken(LoginDto loginDto, User user) {

        try {
            var auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsername(),
                            loginDto.getPassword()
                    )
            );

            var claims = new HashMap<String, Object>();
            claims.put("username", user.getUsername());

            var customUserDetails = (CustomUserDetails) auth.getPrincipal();
            return jwtService.generateToken(claims, customUserDetails);
        } catch (AuthenticationException e) {
            LOGGER.error("Authentication error user id: {}: {}", loginDto.getUsername(), e.getMessage());
            throw new RuntimeException("Authentication failed" + e.getMessage());
        }
    }

    private User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with: " + username + " not found in the system."));
    }

}
