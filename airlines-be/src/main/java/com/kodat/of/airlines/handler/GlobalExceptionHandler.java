package com.kodat.of.airlines.handler;


import com.kodat.of.airlines.exception.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleUserNotFoundException(UserNotFoundException e) {
        LOGGER.error("User not found: {}" , e.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.USER_NOT_FOUND_EXCEPTION.getCode())
                                .businessErrorDescription(BusinessErrorCodes.USER_NOT_FOUND_EXCEPTION.getDescription())
                                .error(e.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        LOGGER.error("User already exists: {}" , e.getMessage());

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.USER_ALREADY_EXISTS.getCode())
                                .businessErrorDescription(BusinessErrorCodes.USER_ALREADY_EXISTS.getDescription())
                                .error(e.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(ConflictFlightException.class)
    public ResponseEntity<ExceptionResponse> handleConflictFlightException(ConflictFlightException e) {
        LOGGER.error("ConflictFlightException: {}" , e.getMessage());

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.CONFLICT_FLIGHT_EXCEPTION.getCode())
                                .businessErrorDescription(BusinessErrorCodes.CONFLICT_FLIGHT_EXCEPTION.getDescription())
                                .error(e.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(UnauthorizedUserAccessException.class)
    public ResponseEntity<ExceptionResponse> handleUnauthorizedUserAccessException(UnauthorizedUserAccessException e) {
        LOGGER.error("UnauthorizedUserAccessException: {}" , e.getMessage());

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.UNAUTHORIZED_USER_ACCESS.getCode())
                                .businessErrorDescription(BusinessErrorCodes.UNAUTHORIZED_USER_ACCESS.getDescription())
                                .error(e.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(FlightNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleFlightNotFoundException(FlightNotFoundException e) {
        LOGGER.error("FlightNotFoundException: {}" , e.getMessage());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.FLIGHT_NOT_FOUND_EXCEPTION.getCode())
                                .businessErrorDescription(BusinessErrorCodes.FLIGHT_NOT_FOUND_EXCEPTION.getDescription())
                                .error(e.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleGenericException(Exception e) {
        LOGGER.error("An unexpected error occurred: {}", e.getMessage(), e);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.GENERIC_EXCEPTION.getCode())
                                .businessErrorDescription(BusinessErrorCodes.GENERIC_EXCEPTION.getDescription())
                                .error(e.getMessage())
                                .build()
                );
    }


}
