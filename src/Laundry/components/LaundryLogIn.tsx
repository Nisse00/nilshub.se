import { useState } from "react";


export default function LaundryLogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(username + " " + password);
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50">
                <h1 className="text-center">Log in</h1>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}