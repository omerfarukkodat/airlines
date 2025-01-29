package com.kodat.of.airlines.flight.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class FlightDto {

    private Long id;

    @NotBlank(message = "Departure City cannot blank")
    private String departureCity;

    @NotBlank(message = "Arrival City cannot blank")
    private String arrivalCity;

    @NotNull(message = "Departure Time cannot blank")
    private LocalDateTime departureTime;

    @NotNull(message = "Arrival Time cannot blank")
    private LocalDateTime arrivalTime;
}
