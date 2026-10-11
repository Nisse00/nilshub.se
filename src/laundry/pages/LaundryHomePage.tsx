import { useNavigate } from "react-router-dom";

export default function LaundryHomePage() {
  const navigate = useNavigate();

  return (
    <div className="laundry-welcome">
      <h1>Welcome to the Booking System</h1>
      <button
        type="button"
        className="laundry-button"
        onClick={() => navigate("/Laundry/calendar")}
      >
        Go to Calendar
      </button>
    </div>
  );
}
