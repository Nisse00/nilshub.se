import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./laundry/pages/AuthPage";
import CalendarPage from "./laundry/pages/CalendarPage";
import LaundryHomePage from "./laundry/pages/LaundryHomePage";
import CvPage from "./pages/CvPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/Cv" element={<CvPage />} />

        <Route path="/Laundry" element={<LaundryHomePage />} />
        <Route path="/Laundry/login" element={<AuthPage key="login" mode="login" />} />
        <Route
          path="/Laundry/login/createAccount"
          element={<AuthPage key="register" mode="register" />}
        />
        <Route path="/Laundry/calendar" element={<CalendarPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
