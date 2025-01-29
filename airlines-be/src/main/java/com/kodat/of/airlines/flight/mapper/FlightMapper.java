package com.kodat.of.airlines.flight.mapper;


import com.kodat.of.airlines.flight.Flight;
import com.kodat.of.airlines.flight.dto.FlightDto;

public class FlightMapper {


    public static FlightDto toFlightDto(Flight flight) {

        return FlightDto.builder()
                .id(flight.getId())
                .departureCity(flight.getDepartureCity())
                .arrivalCity(flight.getArrivalCity())
                .departureTime(flight.getDepartureTime())
                .arrivalTime(flight.getArrivalTime())
                .build();
    }


    public static Flight toFlight(FlightDto flightDto) {

        return Flight.builder()
                .departureCity(flightDto.getDepartureCity())
                .arrivalCity(flightDto.getArrivalCity())
                .departureTime(flightDto.getDepartureTime())
                .arrivalTime(flightDto.getArrivalTime())
                .build();
    }

}
