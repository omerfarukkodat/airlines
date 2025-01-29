package com.kodat.of.airlines.flight.repository;

import com.kodat.of.airlines.flight.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {


    @Query(value = "SELECT * FROM Flights f WHERE " +
            "((f.departure_city = :departureCity AND ABS(EXTRACT(EPOCH FROM (f.departure_time - :departureTime)) / 60) < 30) " +
            "OR (f.arrival_city = :arrivalCity AND ABS(EXTRACT(EPOCH FROM (f.arrival_time - :arrivalTime)) / 60) < 30))",
            nativeQuery = true)
    List<Flight> findConflictingFlights(
            @Param("departureCity") String departureCity,
            @Param("departureTime") LocalDateTime departureTime,
            @Param("arrivalCity") String arrivalCity,
            @Param("arrivalTime") LocalDateTime arrivalTime
    );

    Optional<List<Flight>> findFlightByDepartureCity(String name);

    Optional<List<Flight>> findFlightByDepartureCityAndArrivalCityAndDepartureTimeBetween(
            String departureCity , String arrivalCity, LocalDateTime departureTime, LocalDateTime endOfTheDay
    );
}
