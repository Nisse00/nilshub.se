import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';

interface User {
    name: string;
}

function CalendarPage() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5001/api/laundry/user', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User is logged in') {
                setUser(data.user_info); 
            } else {
                setUser(null); 
            }
        })
        .catch(error => console.error('Error fetching user info:', error));
    }, []); 

    function logOut() {
        fetch("http://localhost:5001/api/laundry/logout", {
            method: "POST",
            credentials: "include",
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert("Failed to log out.");
            }
        })
        .catch(error => console.error("Error:", error));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col" style={{ textAlign: 'center' }}>
                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                        {user ? (
                            <p>{`User logged in: ${user.name}`}</p>  
                        ) : (
                            <p>No user logged in</p> 
                        )}
                    </div>
                    <button onClick={() => navigate('/Laundry/login')} style={{ padding: '10px 20px', fontSize: '16px' }}> Log in </button>
                    <button onClick={logOut} style={{ padding: '10px 20px', fontSize: '16px' }}>Log out</button>
                    <button onClick={() => navigate('/Laundry/login/createAccount')} style={{ padding: '10px 20px', fontSize: '16px' }}>Create account</button>
                    <Calendar />
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
