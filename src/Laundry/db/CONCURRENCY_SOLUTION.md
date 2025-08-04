# Laundry Booking System - Concurrency Solution

## Problem
The original laundry booking system had a race condition where multiple users could potentially book the same time slot simultaneously, leading to double bookings.

## Solution Implemented

### 1. Database-Level Constraints
- **Unique Constraint**: Added `UNIQUE(booking_date, booking_time)` to the bookings table
- **Foreign Key Constraint**: Ensures referential integrity with users table
- **Database Indexes**: Added indexes for better query performance

### 2. Optimistic Locking with Retry Logic
- **Check-then-Insert Pattern**: First check if slot is available, then insert
- **Retry Mechanism**: Up to 3 retries with 100ms delay between attempts
- **Threading Lock**: Uses Python's `threading.Lock()` for coordination

### 3. Comprehensive Error Handling
- **Specific Error Messages**: Different messages for different failure scenarios
- **HTTP Status Codes**: Proper REST API status codes (409 for conflicts, 400 for bad requests)
- **Frontend Integration**: Updated frontend to handle and display error messages

## Key Features

### Backend (`server.py`)
```python
# Database initialization with constraints
def init_database():
    # Creates tables with UNIQUE constraint on (booking_date, booking_time)
    # Adds foreign key constraints and indexes

# Optimistic locking with retry
@app.route("/api/laundry/addBooking", methods=['POST'])
def addBooking():
    max_retries = 3
    while retry_count < max_retries:
        try:
            with db_lock:  # Thread coordination
                # Check if slot available
                # Check if user already booked
                # Insert with unique constraint
        except sqlite3.IntegrityError:
            # Handle concurrent booking attempts
            retry_count += 1
            time.sleep(0.1)
```

### Frontend (`CalendarBox.tsx`)
```typescript
// Proper error handling
.then((response) => {
    if (!response.ok) {
        return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Booking failed');
        });
    }
    return response.json();
})
.then((data) => {
    setIsBooked(!isBooked);
    alert("Booking successful!");
})
.catch((error) => {
    alert(error.message || "Failed to book time slot. Please try again.");
});
```

## Error Scenarios Handled

1. **Slot Already Booked**: User tries to book a time slot that's already taken
   - Status: 409 Conflict
   - Message: "Time slot X on Y is already booked by Z"

2. **User Already Booked**: User tries to book multiple slots on the same date
   - Status: 409 Conflict  
   - Message: "You already have a booking on X at time slot Y"

3. **Concurrent Booking**: Two users try to book the same slot simultaneously
   - Status: 409 Conflict
   - Message: "Time slot X on Y was just booked by another user. Please try a different time."

4. **Database Errors**: General database issues
   - Status: 500 Internal Server Error
   - Message: Descriptive error message

## Migration

Run the migration script to update existing databases:
```bash
cd src/Laundry/db
python migrate_db.py
```

This will:
- Create tables with proper constraints if they don't exist
- Add unique constraints to existing tables
- Create performance indexes
- Preserve existing data

## Benefits

1. **Prevents Double Bookings**: Database-level constraint ensures no duplicate bookings
2. **Handles High Concurrency**: Retry logic handles simultaneous booking attempts
3. **User-Friendly**: Clear error messages help users understand what went wrong
4. **Performance**: Database indexes improve query speed
5. **Data Integrity**: Foreign key constraints maintain referential integrity
6. **Scalable**: Solution works well for multiple concurrent users

## Testing Concurrency

To test the concurrency solution:

1. Open multiple browser tabs/windows
2. Try to book the same time slot simultaneously
3. Verify that only one booking succeeds
4. Check that appropriate error messages are shown

The system will handle the race condition gracefully and provide clear feedback to users. 