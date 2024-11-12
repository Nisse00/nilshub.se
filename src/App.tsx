import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPageLaundry from './Laundry/components/MainPageLaundry';
import CalendarPage from './Laundry/components/CalendarPage';
import MainPageNilshub from './components/MainPageNilshub';
import LaundryLogIn from './Laundry/components/LaundryLogIn.tsx';
import LaundryCreateAccount from './Laundry/components/LaundryCreateAccount.tsx';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPageNilshub />} />
                <Route path="/Laundry" element={<MainPageLaundry />} />
                <Route path="/Laundry/login" element={<LaundryLogIn />} />
                <Route path="/Laundry/login/createAccount" element={<LaundryCreateAccount />} />
                <Route path="/Laundry/calendar" element={<CalendarPage />} />
            </Routes>
        </Router>
    );
}
