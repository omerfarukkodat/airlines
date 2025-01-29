package com.kodat.of.airlines.exception;

public class UnauthorizedUserAccessException extends RuntimeException {
    public UnauthorizedUserAccessException(String message) {
        super(message);
    }
}
