import { useNavigate } from "react-router-dom";
import nilshubPicture from "../assets/nilshub.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home" style={{ backgroundImage: `url(${nilshubPicture})` }}>
      <nav className="home-nav">
        <button type="button" onClick={() => navigate("/Laundry")}>
          Laundry Booking System
        </button>
        <button type="button" onClick={() => navigate("/Cv")}>
          My CV
        </button>
      </nav>
    </div>
  );
}
