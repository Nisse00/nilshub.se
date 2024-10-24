import React from 'react';
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
            <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }} onClick={() => navigate("/Laundry")}>
            Go to Laundry
            </button>
        </div>
    )
}