import { useNavigate } from 'react-router-dom';

function MainPageLaundry() {
    const navigate = useNavigate();

    const goToCalendar = () => {
        navigate('calendar/');
    };
    
    const goToNilshub = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Booking System</h1>
            <button onClick={goToNilshub} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Go to Nilshub
            </button>
            <button onClick={goToCalendar} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Go to Calendar
            </button>
        </div>
    );
}

export default MainPageLaundry;
