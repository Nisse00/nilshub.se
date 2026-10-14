import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CvPage from "./pages/CvPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Routes are case-insensitive, so the old /Cv links keep working */}
        <Route path="/cv" element={<CvPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
