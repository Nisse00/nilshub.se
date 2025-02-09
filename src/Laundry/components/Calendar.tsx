import CalendarBox from "./CalendarBox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface CalendarProps {
    username: string | null;
}

export default function Calendar({ username }: CalendarProps) {
    const currentDate = new Date();
    const [displayedMonth, setDisplayedMonth] = useState(currentDate.getMonth());
    const [displayedYear, setDisplayedYear] = useState(currentDate.getFullYear());
    const daysInMonth = new Date(currentDate.getFullYear(), displayedMonth + 1, 0).getDate();
    const [bookings, setBookings] = useState(Array.from({ length: daysInMonth }, () => [false, false, false]));
    const [userAlreadyBooked, setUserAlreadyBooked] = useState(false);
    const [userBookingDate, setUserBookingDate] = useState("");
    const [userBookingSlot, setUserBookingSlot] = useState(-1);
    const [reRender, setReRender] = useState(0); // Trigger for re-fetching bookings

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Re-fetch bookings and user status when reRender changes
    useEffect(() => {
        fetchBookings();
        fetchUserBookingStatus();
    }, [reRender, username, displayedMonth]);

    // Fetch bookings from the backend
    const fetchBookings = () => {
        fetch("http://localhost:5001/api/laundry/getBookings", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedBookings = Array.from({ length: daysInMonth }, () => [false, false, false]); // Reset bookings array

                data.bookings.forEach(([date, timeSlot]: [string, string]) => {
                    const [year, month, day] = date.split("-").map(Number);
                    if (month - 1 !== displayedMonth) { // Only update bookings for the displayed month
                        return;
                    }
                    const bookingDay = day - 1; // Convert to zero-based index
                    const slotIndex = parseInt(timeSlot) - 1; // Convert time slot to zero-based index

                    if (updatedBookings[bookingDay] && slotIndex >= 0 && slotIndex < 3) {
                        updatedBookings[bookingDay][slotIndex] = true; // Mark the slot as booked
                    }
                });

                setBookings(updatedBookings); // Update bookings state
            })
            .catch((error) => console.error("Error fetching bookings:", error));
    };

    // Fetch user's booking status
    const fetchUserBookingStatus = () => {
        const dateToSend = currentDate.toISOString().split("T")[0];
        fetch("http://localhost:5001/api/laundry/checkBookingForUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, dateToSend}),
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setUserAlreadyBooked(data.message === "User has a booking");
                setUserBookingDate(data.booking_date);
                setUserBookingSlot(data.booking_slot);
            })
            .catch((error) => console.error("Error:", error));
    };

    const forceRerenderCalendar = () => {
        setReRender((prev) => prev + 1); // Increment reRender to trigger useEffect
    };

    const handleSwitchMonth = () => {
        const newDisplayedMonth =
            displayedMonth === currentDate.getMonth()
                ? (currentDate.getMonth() + 1) % 12
                : currentDate.getMonth();
        
        const newDisplayedYear =
            displayedMonth === currentDate.getMonth()
                ? currentDate.getFullYear()
                : currentDate.getFullYear() + 1;

        setDisplayedYear(newDisplayedYear);
        setDisplayedMonth(newDisplayedMonth);
    
        // Reset bookings to avoid undefined error before fetching new data
        setBookings(Array.from({ length: daysInMonth }, () => [false, false, false]));
    
        // Trigger re-fetching of bookings
        setReRender((prev) => prev + 1);
    };

    //This part create the actual calendarBoxes
    const calendarBoxes = Array.from({ length: daysInMonth }, (_, index) => (
        <CalendarBox
            key={index}
            forceRerenderCalendar={forceRerenderCalendar}
            userAlreadyBooked={[userAlreadyBooked, userBookingDate, userBookingSlot]}
            cardTitleNumber={index + 1}
            bookings={bookings[index] && bookings[index].length === 3 ? [bookings[index][0], bookings[index][1], bookings[index][2]] : [false, false, false]}
            expired = {index < currentDate.getDate() - 1 && displayedMonth === currentDate.getMonth()}
            displayedYearMonth={[displayedYear, displayedMonth]}
        />
    ));

    const navigate = useNavigate();
    const rows = [];
    const columnsPerRow = [8, 8, 8, 7]; // Number of columns for each row

    let currentIndex = 0;
    for (let i = 0; i < columnsPerRow.length; i++) {
        const columns = [];
        for (let j = 0; j < columnsPerRow[i]; j++) {
            columns.push(calendarBoxes[currentIndex]);
            currentIndex++;
        }
        rows.push(
            <div className="row" key={i}>
                {columns}
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row" style={{ marginTop: "20px", alignItems: "center" }}>
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/Laundry")}
                        style={{ marginRight: "10px" }}
                    >
                        Back
                    </button>
                </div>
                <div className="col text-center">
                    <h1>Calendar Booking</h1>
                    <h3>{monthNames[displayedMonth] }</h3>
                <div className="color-coding">
                    <span style={{ backgroundColor: "green", display: "inline-block", width: "20px", height: "20px", marginRight: "5px" }}></span> Free to book
                    <span style={{ backgroundColor: "gray", display: "inline-block", width: "20px", height: "20px", marginLeft: "10px", marginRight: "5px" }}></span> Unavailable
                    <span style={{ backgroundColor: "red", display: "inline-block", width: "20px", height: "20px", marginLeft: "10px", marginRight: "5px" }}></span> Booked by someone else
                    <span style={{ backgroundColor: "blue", display: "inline-block", width: "20px", height: "20px", marginLeft: "10px", marginRight: "5px" }}></span> Your current booking
                </div>
                </div>
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleSwitchMonth()}
                        style={{ marginLeft: "10px" }}
                    >
                        {displayedMonth === currentDate.getMonth() ? "Next Month" : "Back to current month"}
                    </button>
                </div>
            </div>
            {rows}
        </div>
    );
}
