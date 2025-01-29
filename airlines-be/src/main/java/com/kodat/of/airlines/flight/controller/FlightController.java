package com.kodat.of.airlines.flight.controller;


import com.kodat.of.airlines.flight.dto.FlightDto;
import com.kodat.of.airlines.flight.service.FlightService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;

    @PostMapping
    @Secured("ADMIN")
    public ResponseEntity<FlightDto> add(@RequestBody @Valid FlightDto flightDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(flightService.add(flightDto));
    }

    @GetMapping
    @Secured("ADMIN")
    public ResponseEntity<List<FlightDto>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(flightService.getAll());
    }

    @GetMapping("/findByCity")
    @Secured("USER")
    public ResponseEntity<List<FlightDto>> getByCity(Authentication connectedUser) {
        return ResponseEntity.status(HttpStatus.OK).body(flightService.getByCity(connectedUser));

    }

    @GetMapping("/search")
    @Secured("USER")
    public ResponseEntity<List<FlightDto>> getBySearch(
            Authentication connectedUser,
            @RequestParam(required = false) String departureCity,
            @RequestParam(required = false) String arrivalCity,
            @RequestParam(required = false) @DateTimeFormat (iso = DateTimeFormat.ISO.DATE) LocalDate departureDate) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(flightService.getBySearch(connectedUser,departureCity,arrivalCity,departureDate));

    }

    @DeleteMapping("/{id}")
    @Secured("ADMIN")
    public ResponseEntity<Void> deleteById(@PathVariable Long id, Authentication connectedUser) {
        flightService.deleteById(id,connectedUser);
        return ResponseEntity.noContent().build();

    }

}
