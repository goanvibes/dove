package com.dovenest.calendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/api/v1/availability")
@CrossOrigin(origins = "*") // Allow frontend to fetch data
public class AvailabilityCheck {

    public static void main(String[] args) {
        SpringApplication.run(AvailabilityCheck.class, args);
    }

    /**
     * Endpoint to get booked dates for a specific month and year.
     * Example: GET /api/v1/availability/booked?year=2026&month=6
     */
    @GetMapping("/booked")
    public ResponseEntity<List<LocalDate>> getBookedDates(
            @RequestParam int year, 
            @RequestParam int month) {
        
        List<LocalDate> bookedDates = fetchBookedDatesFromDatabase(year, month);
        return ResponseEntity.ok(bookedDates);
    }

    /**
     * Simulated database connection method.
     * In production, this would use JPA/Hibernate to query your actual SQL/NoSQL database.
     */
    private List<LocalDate> fetchBookedDatesFromDatabase(int year, int month) {
        List<LocalDate> mockedBookings = new ArrayList<>();
        
        // Simulating recurring weekend bookings or corporate events
        mockedBookings.add(LocalDate.of(year, month, 5));
        mockedBookings.add(LocalDate.of(year, month, 12));
        mockedBookings.add(LocalDate.of(year, month, 13));
        mockedBookings.add(LocalDate.of(year, month, 19));
        mockedBookings.add(LocalDate.of(year, month, 20));
        mockedBookings.add(LocalDate.of(year, month, 26));

        return mockedBookings;
    }
}
