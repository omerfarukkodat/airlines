package com.kodat.of.airlines.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BusinessErrorCodes {
    USER_NOT_FOUND_EXCEPTION(404,HttpStatus.NOT_FOUND,"User not found."),
    FLIGHT_NOT_FOUND_EXCEPTION(404,HttpStatus.NOT_FOUND,"Flight not found"),
    USER_ALREADY_EXISTS(409,HttpStatus.CONFLICT,"User already exists."),
    CONFLICT_FLIGHT_EXCEPTION(409,HttpStatus.CONFLICT,"Flight conflict time"),
    UNAUTHORIZED_USER_ACCESS(403,HttpStatus.UNAUTHORIZED, "Unauthorized user access"),
    GENERIC_EXCEPTION(500, HttpStatus.INTERNAL_SERVER_ERROR,"An unexpected error occurred");;


    private final int code;
    private final HttpStatus httpStatus;
    private final String description;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
}
