import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LaundryCreateAccount() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        
        fetch("http://localhost:5001/api/laundry/login/createAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                navigate('/Laundry/calendar');
            } else {
                alert("Failed to add user.");
            }
        })
        .catch(error => console.error("Error:", error));
    }

    return (
        <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50">
                <h1 className="text-center">Create account</h1>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}className="form-control" id="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}className="form-control" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Create account</button>
                </form>
            </div>
        </div>
        </>
    );
}