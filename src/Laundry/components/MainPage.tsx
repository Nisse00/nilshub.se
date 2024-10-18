import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function MainPage() {
    const navigate = useNavigate();

    const goToCalendar = () => {
        navigate('/calendar');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Booking System</h1>
            <button onClick={goToCalendar} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Go to Calendar
            </button>
        <form style={{textAlign: 'center'}}>
            <label>
                username:
                <input type="text" name="name" />
            </label>
        </form>
        </div>
    );
}

export default MainPage;
