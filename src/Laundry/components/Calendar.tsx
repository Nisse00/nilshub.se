import CalendarBox from "./CalendarBox";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Calendar() {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const [bookings, setBookings] = useState(Array.from({ length: daysInMonth }, () => [false, false, false]));

    useEffect(() => {
        fetch('http://localhost:5001/api/laundry/getBookings', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            const updatedBookings = Array.from({ length: 31 }, () => [false, false, false]); // Reset bookings array

            data.bookings.forEach(([date, timeSlot]: [string, string]) => {
                const [day, month, year] = date.split('-').map(Number);
                const bookingDay = day - 1; // Convert to zero-based index
                const slotIndex = parseInt(timeSlot) - 1; // Convert time slot to zero-based index
                
                if (updatedBookings[bookingDay] && slotIndex >= 0 && slotIndex < 3) {
                    updatedBookings[bookingDay][slotIndex] = true; // Mark the slot as booked
                }
            });

            setBookings(updatedBookings); // Update state with new bookings
        })
        .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const currentMonthStr = currentDate.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + currentDate.toLocaleString('default', { month: 'long' }).slice(1);

    const calendarBoxes = Array.from({ length: daysInMonth }, (_, index) => (
        <CalendarBox key={index} cardTitleNumber={index + 1} bookings={bookings[index] as [boolean, boolean, boolean]} />
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
        rows.push(<div className="row" key={i}>{columns}</div>);
    }

    return (
        <div className="container">
            <div className="row" style={{ marginTop: "20px", alignItems: "center" }}>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={() => navigate("/Laundry")} style={{ marginRight: "10px" }}>Back</button>
                </div>
                <div className="col text-center">
                    <h1>Calendar Booking</h1>
                    <h3>{currentMonthStr}</h3>
                </div>
            </div>
            {rows}
        </div>
    );
}
