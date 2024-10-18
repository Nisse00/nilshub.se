import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import CalendarPage from './components/CalendarPage';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
        </Router>
    );
}
