import { useNavigate } from 'react-router-dom';
import nilshubpicture from '../pictures/nilshub.png';


export default function MainPageNilshub() {
    const navigate = useNavigate();
    return (
        <div style={{ 
            backgroundImage: `url(${nilshubpicture})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            width: '100vw', 
            height: '100vh' 
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
                <button style={{ padding: '10px 40px', fontSize: '16px', marginBottom: '20px' }} onClick={() => navigate("/Laundry")}>
                    Laundry Booking System
                </button>
                <button style={{ padding: '10px 40px', fontSize: '16px' }} onClick={() => navigate("/CV")}>
                    My CV
                </button>
            </div>
        </div>
    )
}