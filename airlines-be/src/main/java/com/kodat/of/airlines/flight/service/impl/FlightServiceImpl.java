package com.kodat.of.airlines.flight.service.impl;

import com.kodat.of.airlines.exception.ConflictFlightException;
import com.kodat.of.airlines.exception.FlightNotFoundException;
import com.kodat.of.airlines.exception.UserNotFoundException;
import com.kodat.of.airlines.flight.Flight;
import com.kodat.of.airlines.flight.dto.FlightDto;
import com.kodat.of.airlines.flight.mapper.FlightMapper;
import com.kodat.of.airlines.flight.repository.FlightRepository;

import com.kodat.of.airlines.flight.service.FlightService;
import com.kodat.of.airlines.user.User;
import com.kodat.of.airlines.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightServiceImpl implements FlightService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FlightServiceImpl.class);

    private final FlightRepository flightRepository;
    private final UserRepository userRepository;


    @Override
    public FlightDto add(FlightDto flightDto,Authentication connectedUser) {
        checkUser(connectedUser);
        isAvailableFlight(flightDto);

        Flight flight = FlightMapper.toFlight(flightDto);
        flightRepository.save(flight);
        return FlightMapper.toFlightDto(flight);
    }

    @Override
    public List<FlightDto> getAll(Authentication connectedUser) {
        checkUser(connectedUser);
        List<Flight> flights = flightRepository.findAll();
        return flights.stream()
                .map(FlightMapper::toFlightDto)
                .toList();
    }

    @Override
    public List<FlightDto> getByCity(Authentication connectedUser) {
        checkUser(connectedUser);
        User user = getUser(connectedUser);
        List<Flight> flights = flightRepository.findFlightByDepartureCity(user.getLocatedCity())
                .orElseThrow(() -> new FlightNotFoundException("Flight not found from the user's located city."));

        return flights.stream()
                .map(FlightMapper::toFlightDto)
                .toList();


    }

    @Override
    public List<FlightDto> getBySearch(
            Authentication connectedUser, String departureCity, String arrivalCity, LocalDate departureDate) {

        checkUser(connectedUser);

        LocalDateTime startDate = departureDate.atStartOfDay();
        LocalDateTime endDate = departureDate.atTime(23, 59, 59);

        List<Flight> flights = flightRepository.findFlightByDepartureCityAndArrivalCityAndDepartureTimeBetween(
                        departureCity, arrivalCity, startDate, endDate)
                .orElseThrow(() -> new FlightNotFoundException("There are no available flights for that day between these cities."));

        return flights.stream()
                .map(FlightMapper::toFlightDto)
                .toList();
    }

    @Override
    public void deleteById(Long id, Authentication connectedUser) {

        checkUser(connectedUser);

        Flight flight = flightRepository.findById(id).orElseThrow(
                () -> new FlightNotFoundException("Flight not found from the system's."));

        LOGGER.info("Deleted flight with id: {}", id);
        flightRepository.delete(flight);
    }

    private void checkUser(Authentication connectedUser) {
        isAuthenticated(connectedUser);
    }


    private boolean isAuthenticated(Authentication connectedUser) {
        User user = getUser(connectedUser);
        return user.getUsername().equals(connectedUser.getName()) && connectedUser.isAuthenticated();
    }


    private User getUser(Authentication connectedUser) {
        return userRepository.findByUsername(connectedUser.getName())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }


    public void isAvailableFlight(FlightDto flightDto) {

        List<Flight> departureFlights = flightRepository.findConflictingFlights(
                flightDto.getDepartureCity(),
                flightDto.getDepartureTime(),
                flightDto.getArrivalCity(),
                flightDto.getArrivalTime()
        );
        if (!departureFlights.isEmpty()) {
            throw new ConflictFlightException("There are flights that violate the 30-minute rule.");
        }

    }


}
