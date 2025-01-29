package com.kodat.of.airlines.config;

import com.kodat.of.airlines.user.User;
import com.kodat.of.airlines.user.enums.Role;
import com.kodat.of.airlines.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@RequiredArgsConstructor
public class AdminInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String username;

    @Value("${admin.password}")
    private String password;

    @Bean
    CommandLineRunner initAdminUser() {
        return args -> {
            if (userRepository.findByUsername(username).isEmpty()) {
                User admin = User.builder()
                        .firstName("omer")
                        .lastName("kodat")
                        .username(username)
                        .password(passwordEncoder.encode(password))
                        .locatedCity("Istanbul")
                        .accountLocked(false)
                        .enabled(true)
                        .role(Role.ADMIN)
                        .build();

                userRepository.save(admin);
            }
        };
    }

}
