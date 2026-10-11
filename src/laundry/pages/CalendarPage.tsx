import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorMessage, getUser, logout } from "../api";
import Calendar from "../components/Calendar";

export default function CalendarPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then(setUsername)
      .catch((err) => setError(errorMessage(err)));
  }, []);

  async function handleLogOut() {
    try {
      await logout();
      setUsername(null);
      setError("");
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <div className="laundry-page">
      <p className="laundry-user">
        {username ? `User logged in: ${username}` : "No user logged in"}
      </p>
      {username ? (
        <button type="button" className="laundry-button" onClick={handleLogOut}>
          Log out
        </button>
      ) : (
        <>
          <button
            type="button"
            className="laundry-button"
            onClick={() => navigate("/Laundry/login")}
          >
            Log in
          </button>
          <button
            type="button"
            className="laundry-button"
            onClick={() => navigate("/Laundry/login/createAccount")}
          >
            Create account
          </button>
        </>
      )}
      {error && (
        <div className="alert alert-danger container mt-3" role="alert">
          {error}
        </div>
      )}
      <Calendar username={username} />
    </div>
  );
}
