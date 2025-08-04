import { useState, useEffect } from "react";
import BookingPopout from "./SavingBookingPopout";

interface CalendarBoxProps {
    readonly cardTitleNumber: number;
    readonly bookings: readonly [boolean, boolean, boolean];
    readonly userAlreadyBooked: readonly [boolean, string, number];
    readonly forceRerenderCalendar: () => void;
    readonly expired: boolean;
    readonly displayedYearMonth: readonly [number, number];
}

export default function CalendarBox({cardTitleNumber, bookings, userAlreadyBooked, forceRerenderCalendar, expired, displayedYearMonth}: CalendarBoxProps) {
    const [isBooked1, setIsBooked1] = useState(bookings[0]);
    const [isBooked2, setIsBooked2] = useState(bookings[1]);
    const [isBooked3, setIsBooked3] = useState(bookings[2]);
    const [showSavingBookingPopout, setShowSavingBookingPopout] = useState(false);
    const [showCancelBookingPopout, setShowCancelBookingPopout] = useState(false);
    const [bookingText, setBookingText] = useState("");
    const [bookingSlot, setBookingSlot] = useState<number | null>(null);
    const [username, setUsername] = useState("");


    const date = new Date();
    const bookingDate = `${displayedYearMonth[0]}-${String(displayedYearMonth[1] + 1).padStart(2,'0')}-${String(cardTitleNumber).padStart(2,'0')}`;
    const bookingDateNbr = Number(`${displayedYearMonth[0]}${displayedYearMonth[1] + 1}${cardTitleNumber}`);
    const currentDateNbr = Number(`${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`);

    useEffect(() => {
        setIsBooked1(bookings[0]);
        setIsBooked2(bookings[1]);
        setIsBooked3(bookings[2]);
    }, [bookings]);

    useEffect(() => {
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
    }, []);

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

    const handleClick = (arg: number, text: string, bookingButton: boolean): void => {
        if (!username) {
            alert("You must be logged in to book a time slot.");
            return;
        }

        if (bookingDateNbr < currentDateNbr) {
            alert("You cannot book/cancel a time slot for a date in the past.");
            return;
        }

        if (userAlreadyBooked[0] && !bookingButton) {
            alert("You have already booked a time slot and cannot book another one.");
            return;
        }

        if (bookingButton) {
            // Check if the current user is the one who made the booking
            if (checkIfUserHasBookedThisSlot(arg)) {
                // If it's the user's booking, allow them to cancel it
                handleConfirmation(true, text, arg);
            } else {
                alert("This time slot is already booked by another user.");
            }
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
                console.error("Error:", error);
                alert(error.message || "Failed to book time slot. Please try again.");
            });
    };

    const toggleCancelBooking = (isBooked: boolean, setIsBooked: (value: boolean) => void, time: number) => {
        fetch("http://localhost:5001/api/laundry/deleteBooking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, date: bookingDate, time }),
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || 'Cancellation failed');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setIsBooked(!isBooked);
                alert("Booking cancelled successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(error.message || "Failed to cancel booking. Please try again.");
            });
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
        //We need to call a function to update the state of the bookings
        forceRerenderCalendar();
        setShowSavingBookingPopout(false);
        setShowCancelBookingPopout(false);
    };

    //Both these functions are called by the modal popout
    const handleCloseSave = () => setShowSavingBookingPopout(false);
    const handleCloseCancel = () => setShowCancelBookingPopout(false);

    //This function checks if the user has already booked a slot for the current day in the correct slot
    const checkIfUserHasBookedThisSlot = (idx: number): boolean => {
        if(userAlreadyBooked[0]) {
            if(Number(userAlreadyBooked[1].split("-")[2]) === cardTitleNumber) {
                if(displayedYearMonth[1] === Number(userAlreadyBooked[1].split("-")[1]) - 1) {
                    if(userAlreadyBooked[2] == idx) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

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
                                className={`btn ${
                                    expired
                                        ? "btn-secondary"
                                        : (checkIfUserHasBookedThisSlot(idx+1))
                                        ? "btn-primary"
                                        : [isBooked1, isBooked2, isBooked3][idx]
                                        ? "btn-danger"
                                        : "btn-success"
                                }`}
                                onClick={() => handleClick(idx + 1, time, [isBooked1, isBooked2, isBooked3][idx])}
                                style={{ padding: "0.5rem" }}
                                disabled={expired}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <BookingPopout show={showSavingBookingPopout} handleCloseSave={handleCloseSave} handleCloseCancel={handleCloseCancel} handleSave={handleSave} text={bookingText} option={"Book"} />
            <BookingPopout show={showCancelBookingPopout} handleCloseSave={handleCloseSave} handleCloseCancel={handleCloseCancel} handleSave={handleSave} text={bookingText} option={"Cancel"} />
        </div>
    );
}
