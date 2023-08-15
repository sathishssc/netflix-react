// src/components/routes/Login.js

import React, { useState } from "react";
import './Login.css' ;
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";



function Login({ onUpdate }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        if (!email) {
            alert("Please Fill your Email ");
            return;
        }

        if (!email.includes('@')) {
            alert('Email should contain @');
            return;
        } 


        if (!password) {
            alert("Please Fill the password");
            return;
        }
        
        
        try {
            const response = await axios.post(
                `https://netflix-clone-backend-4v3y.onrender.com/login`,
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const jwtToken = response.data.data;
            if (jwtToken) {
                localStorage.setItem("jwtToken", jwtToken);
                // onUpdate();
                // navigate('/home');
                window.location.href = "/";
            } else {
                alert('Failed to receive JWT token.');
            }
        } catch (error) {
            console.error("Axios error:", error);
            alert('Failed to Sign In: ' + error.message);
        }
    };

    return (
        <div className="container">
            <div className="image-container">
                <h1 className="head">Tuner</h1>
                <h2 className="head2">Enjoy Multiple videos <br></br>at one place</h2>
                <Link to="/register" className="register-link">Register</Link>
            </div>
            <div className="sign-in-container">
                <form action="https://netflix-clone-backend-4v3y.onrender.com/login" method="post" id="form-section" onSubmit={handleSubmit}>
                    <h2 className="sign-in-title-1">Sign In</h2>
                    <h4 className="sign-in-title-2">Sign in to continue access pages</h4>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                    />
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>    
    );
}

export default Login;