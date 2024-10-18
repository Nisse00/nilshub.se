import { useState } from "react";
import SavingBookingPopout from "./SavingBookingPopout";
import CancellingBookingPopout from "./CancellingBookingPopout";

interface CalendarBoxProps {
    readonly cardTitleNumber: number;
}

export default function CalendarBox({ cardTitleNumber }: CalendarBoxProps) {
    const [isBooked1, setIsBooked1] = useState(false);
    const [isBooked2, setIsBooked2] = useState(false);
    const [isBooked3, setIsBooked3] = useState(false);
    const [showSavingBookingPopout, setShowSavingBookingPopout] = useState(false);
    const [showCancelBookingPopout, setShowCancelBookingPopout] = useState(false);
    const [bookingText, setBookingText] = useState("");
    const [bookingSlot, setBookingSlot] = useState<number | null>(null);

    const handleConfirmation = (isBooked: boolean, text: string, slot: number): boolean => {
        setBookingText(text); // Set the booking text
        setBookingSlot(slot); // Set the booking slot
        if (isBooked) {
            setShowCancelBookingPopout(true); // Show the CancellingBookingPopout modal
        } else {
            setShowSavingBookingPopout(true); // Show the BookingPopout modal
        }
        return true;
    };

    const handleClick = (arg: number, text: string): void => {
        if (arg === 1) {
            isBooked1 ? handleConfirmation(true, text, arg) : handleConfirmation(false, text, arg);
        }
        if (arg === 2) {
            isBooked2 ? handleConfirmation(true, text, arg) : handleConfirmation(false, text, arg);
        }
        if (arg === 3) {
            isBooked3 ? handleConfirmation(true, text, arg) : handleConfirmation(false, text, arg);
        }
    };

    //Used by the BookingPopout component
    const handleSave = () => {
        if (bookingSlot !== null) {
            switch (bookingSlot) {
                case 1:
                    if (isBooked1) {
                        setIsBooked1(false);
                    } else {
                        setIsBooked1(true);
                    }
                    break;
                case 2:
                    if (isBooked2) {
                        setIsBooked2(false);
                    } else {
                        setIsBooked2(true);
                    }
                    break;
                case 3:
                    if (isBooked3) {
                        setIsBooked3(false);
                    } else {
                        setIsBooked3(true);
                    }
                    break;
                default:
                    break;
            }
        }
        if (showSavingBookingPopout) {
            setShowSavingBookingPopout(false);
        } else {
            setShowCancelBookingPopout(false);
        }
    };

    //Used by the BookingPopout component
    const handleCloseSave = () => {
        setShowSavingBookingPopout(false);
    };

    //Used by the CancellingBookingPopout component
    const handleCloseCancel = () => {
        setShowCancelBookingPopout(false);
    };

    return (
        <div className="card" style={{ width: "10rem", height: "8rem" }}>
            <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "14px" }}>{cardTitleNumber}</h5>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li style={{ marginLeft: "-1.25rem", marginBottom: "0.5rem", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
                        <span>08:00-12:00</span>
                        <button
                            className={`btn ${isBooked1 ? "btn-danger" : "btn-success"}`}
                            onClick={() => handleClick(1, "08:00-12:00")}
                            style={{ padding: "0.5rem" }}
                        >
                            {/* No text needed */}
                        </button>
                    </li>
                    <li style={{ marginLeft: "-1.25rem", marginBottom: "0.5rem", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
                        <span>12:00-16:00</span>
                        <button
                            className={`btn ${isBooked2 ? "btn-danger" : "btn-success"}`}
                            onClick={() => handleClick(2, "12:00-16:00")}
                            style={{ padding: "0.5rem" }}
                        >
                            {/* No text needed */}
                        </button>
                    </li>
                    <li style={{ marginLeft: "-1.25rem", marginBottom: "0.5rem", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
                        <span>16:00-20:00</span>
                        <button
                            className={`btn ${isBooked3 ? "btn-danger" : "btn-success"}`}
                            onClick={() => handleClick(3, "16:00-20:00")}
                            style={{ padding: "0.5rem" }}
                        >
                            {/* No text needed */}
                        </button>
                    </li>
                </ul>
            </div>
            <SavingBookingPopout show={showSavingBookingPopout} handleCloseSave={handleCloseSave} handleSave={handleSave} text={bookingText} />
            <CancellingBookingPopout show={showCancelBookingPopout} handleCloseCancel={handleCloseCancel} handleSave={handleSave} text={bookingText} />
        </div>
    );
}
