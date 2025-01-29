package com.kodat.of.airlines.exception;

public class ConflictFlightException extends RuntimeException {
    public ConflictFlightException(String message) {
        super(message);
    }
}
