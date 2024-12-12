import { useState, useEffect } from "react";
import SavingBookingPopout from "./SavingBookingPopout";
import CancellingBookingPopout from "./CancellingBookingPopout";

interface CalendarBoxProps {
    cardTitleNumber: number;
    bookings: [boolean, boolean, boolean];
}

export default function CalendarBox({ cardTitleNumber, bookings }: CalendarBoxProps) {
    const [isBooked1, setIsBooked1] = useState(bookings[0]);
    const [isBooked2, setIsBooked2] = useState(bookings[1]);
    const [isBooked3, setIsBooked3] = useState(bookings[2]);
    const [showSavingBookingPopout, setShowSavingBookingPopout] = useState(false);
    const [showCancelBookingPopout, setShowCancelBookingPopout] = useState(false);
    const [bookingText, setBookingText] = useState("");
    const [bookingSlot, setBookingSlot] = useState<number | null>(null);
    const [username, setUsername] = useState("");

    const date = new Date();
    const bookingDate = `${cardTitleNumber}-${date.getMonth() + 1}-${date.getFullYear()}`;

    useEffect(() => {
        // Update isBooked states when bookings props change
        setIsBooked1(bookings[0]);
        setIsBooked2(bookings[1]);
        setIsBooked3(bookings[2]);

        // Fetch logged-in user details
        fetch("http://localhost:5001/api/laundry/user", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "User is logged in") {
                    setUsername(data.user_info);
                } else {
                    setUsername("");
                }
            })
            .catch((error) => console.error("Error fetching user info:", error));
    }, [bookings]);

    //This is all for the modal popout
    const handleConfirmation = (isBooked: boolean, text: string, slot: number): boolean => {
        setBookingText(text);
        // Set the booking slot to be saved/cancelled (1, 2, or 3) with the corresponding values 8:00-12:00, 12:00-16:00, 16:00-20:00
        setBookingSlot(slot);
        if (isBooked) {
            setShowCancelBookingPopout(true);
        } else {
            setShowSavingBookingPopout(true);
        }
        return true;
    };

    const handleClick = (arg: number, text: string): void => {
        if (!username) {
            alert("You must be logged in to book a time slot.");
            return;
        }
        if (arg === 1) handleConfirmation(isBooked1, text, arg);
        if (arg === 2) handleConfirmation(isBooked2, text, arg);
        if (arg === 3) handleConfirmation(isBooked3, text, arg);
    };

    const toggleBooking = (isBooked: boolean, setIsBooked: (value: boolean) => void, time: number) => {
        fetch("http://localhost:5001/api/laundry/addBooking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, date: bookingDate, time, isBooked: !isBooked }),
            credentials: "include",
        })
            .then(() => setIsBooked(!isBooked))
            .catch((error) => console.error("Error:", error));
    };

    const toggleCancelBooking = (isBooked: boolean, setIsBooked: (value: boolean) => void, time: number) => {
        fetch("http://localhost:5001/api/laundry/deleteBooking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, date: bookingDate, time }),
            credentials: "include",
        })
            .then(() => setIsBooked(!isBooked))
            .catch((error) => console.error("Error:", error));
    }

    //This is called by the modal popout
    const handleSave = () => {
        const setBookedStates = [setIsBooked1, setIsBooked2, setIsBooked3];
        if (bookingSlot !== null) {
            const theBookingSlot = isBooked1 ? 1 : isBooked2 ? 2 : isBooked3 ? 3 : null;
            //If the booking slot is already booked, we neeed to cancel it
            if (theBookingSlot) {
                toggleCancelBooking([isBooked1, isBooked2, isBooked3][theBookingSlot - 1], setBookedStates[theBookingSlot - 1], theBookingSlot);
            } else {
                toggleBooking([isBooked1, isBooked2, isBooked3][bookingSlot - 1], setBookedStates[bookingSlot - 1], bookingSlot);
            }
        }
        setShowSavingBookingPopout(false);
        setShowCancelBookingPopout(false);
    };

    //Both these functions are called by the modal popout
    const handleCloseSave = () => setShowSavingBookingPopout(false);
    const handleCloseCancel = () => setShowCancelBookingPopout(false);

    return (
        <div className="card" style={{ width: "10rem", height: "8rem" }}>
            <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "14px" }}>{cardTitleNumber}</h5>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {["08:00-12:00", "12:00-16:00", "16:00-20:00"].map((time, idx) => (
                        <li
                            key={idx}
                            style={{
                                marginLeft: "-1.25rem",
                                marginBottom: "0.5rem",
                                fontSize: "12px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>{time}</span>
                            <button
                                className={`btn ${[isBooked1, isBooked2, isBooked3][idx] ? "btn-danger" : "btn-success"}`}
                                onClick={() => handleClick(idx + 1, time)}
                                style={{ padding: "0.5rem" }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <SavingBookingPopout show={showSavingBookingPopout} handleCloseSave={handleCloseSave} handleSave={handleSave} text={bookingText} />
            <CancellingBookingPopout show={showCancelBookingPopout} handleCloseCancel={handleCloseCancel} handleSave={handleSave} text={bookingText} />
        </div>
    );
}
