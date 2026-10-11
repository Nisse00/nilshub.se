import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Booking, cancelBooking, createBooking, errorMessage, getBookings } from "../api";
import BookingPopout from "./BookingPopout";
import { SLOT_STYLES, SlotStatus, TIME_SLOTS } from "../slots";
import CalendarBox from "./CalendarBox";

interface CalendarProps {
  readonly username: string | null;
}

interface PendingAction {
  readonly action: "book" | "cancel";
  readonly date: string;
  readonly slot: number;
}

interface Notice {
  readonly kind: "success" | "danger";
  readonly text: string;
}

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toISODate = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export default function Calendar({ username }: CalendarProps) {
  const navigate = useNavigate();
  const [showNextMonth, setShowNextMonth] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

  const now = new Date();
  const today = toISODate(now.getFullYear(), now.getMonth(), now.getDate());
  // Date normalises month 12 to January of the following year
  const displayed = new Date(now.getFullYear(), now.getMonth() + (showNextMonth ? 1 : 0), 1);
  const displayedYear = displayed.getFullYear();
  const displayedMonth = displayed.getMonth();
  const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
  // Empty cells before the 1st so it lands under its weekday (getDay() has Sunday = 0)
  const leadingBlanks = (displayed.getDay() + 6) % 7;

  const refreshBookings = useCallback(async () => {
    try {
      setBookings(await getBookings());
    } catch (err) {
      setNotice({ kind: "danger", text: errorMessage(err) });
    }
  }, []);

  // `username` is a dependency because it decides which bookings are `mine`
  useEffect(() => {
    refreshBookings();
  }, [refreshBookings, username]);

  const hasOwnBooking = bookings.some((booking) => booking.mine);

  const slotStatus = (date: string, slot: number): SlotStatus => {
    if (date < today) return "expired";
    const booking = bookings.find((b) => b.date === date && b.slot === slot);
    if (!booking) return "free";
    return booking.mine ? "mine" : "taken";
  };

  const handleSlotClick = (date: string, slot: number) => {
    const fail = (text: string) => setNotice({ kind: "danger", text });
    setNotice(null);

    if (!username) return fail("You must be logged in to book a time slot.");

    switch (slotStatus(date, slot)) {
      case "mine":
        return setPending({ action: "cancel", date, slot });
      case "taken":
        return fail("This time slot is already booked by another user.");
      case "free":
        if (hasOwnBooking)
          return fail("You have already booked a time slot and cannot book another one.");
        return setPending({ action: "book", date, slot });
    }
  };

  const handleConfirm = async () => {
    if (!pending) return;
    setPending(null);
    try {
      if (pending.action === "book") {
        await createBooking(pending.date, pending.slot);
        setNotice({ kind: "success", text: "Booking successful!" });
      } else {
        await cancelBooking(pending.date, pending.slot);
        setNotice({ kind: "success", text: "Booking cancelled successfully!" });
      }
    } catch (err) {
      setNotice({ kind: "danger", text: errorMessage(err) });
    }
    // Also after a failure: someone else may have taken the slot meanwhile
    await refreshBookings();
  };

  const calendarBoxes = Array.from({ length: daysInMonth }, (_, index) => {
    const date = toISODate(displayedYear, displayedMonth, index + 1);
    return (
      <CalendarBox
        key={date}
        day={index + 1}
        slots={TIME_SLOTS.map((_, idx) => slotStatus(date, idx + 1))}
        onSlotClick={(slot) => handleSlotClick(date, slot)}
      />
    );
  });

  return (
    <div className="container">
      <div className="row align-items-center pt-4">
        <div className="col-auto">
          <button type="button" className="btn btn-primary" onClick={() => navigate("/Laundry")}>
            Back
          </button>
        </div>
        <div className="col text-center">
          <h1>Calendar Booking</h1>
          <h2 className="h3">
            {MONTH_NAMES[displayedMonth]} {displayedYear}
          </h2>
          <div>
            {(["free", "expired", "taken", "mine"] as const).map((status) => (
              <span key={status}>
                <span className={`calendar-legend-swatch ${SLOT_STYLES[status].button}`} />
                {SLOT_STYLES[status].label}
              </span>
            ))}
          </div>
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowNextMonth((next) => !next)}
          >
            {showNextMonth ? "Back to current month" : "Next Month"}
          </button>
        </div>
      </div>
      {notice && (
        <div className={`alert alert-${notice.kind} alert-dismissible mt-3`} role="alert">
          {notice.text}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setNotice(null)}
          />
        </div>
      )}
      <div className="calendar-scroll mt-3">
        <div className="calendar-grid">
          {WEEKDAYS.map((weekday) => (
            <div key={weekday} className="calendar-weekday">
              {weekday}
            </div>
          ))}
          {Array.from({ length: leadingBlanks }, (_, index) => (
            <div key={`blank-${index}`} />
          ))}
          {calendarBoxes}
        </div>
      </div>
      <BookingPopout
        show={pending !== null}
        action={pending?.action ?? "book"}
        text={pending ? `${pending.date}, ${TIME_SLOTS[pending.slot - 1]}` : ""}
        onClose={() => setPending(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
