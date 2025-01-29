package com.kodat.of.airlines.flight.service;

import com.kodat.of.airlines.flight.dto.FlightDto;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;

public interface FlightService {

    FlightDto add(FlightDto flightDto);
    List<FlightDto> getAll();

    List<FlightDto> getByCity(Authentication connectedUser);

    List<FlightDto> getBySearch(Authentication connectedUser, String departureCity, String arrivalCity, LocalDate departureDate);

    void deleteById(Long id, Authentication connectedUser);
}
