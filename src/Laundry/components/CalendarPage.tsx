import Calendar from './Calendar'; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

function CalendarPage() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row">
                <div className="col" style={{ textAlign: 'center' }}>
                <button onClick={() => navigate('/Laundry/login')} style={{ padding: '10px 20px', fontSize: '16px' }}> Log in </button>
                <button onClick={() => navigate('/Laundry/login/createAccount')} style={{ padding: '10px 20px', fontSize: '16px' }}>Create account</button>
                    <Calendar />
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
