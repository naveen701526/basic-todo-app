// Login.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Make a POST request to get authentication token
            const postResponse = await axios.post('http://localhost:8080/api/authenticate', {
                username,
                password
            });
            const authToken = postResponse.data; // Assuming the token is returned in the response
            console.log(authToken);
            localStorage.setItem('token', authToken);
            navigate('/todos')
        } catch (error) {
            console.error('Error fetching data:', error);
            setPassword('')
            setUsername('')
        }

    };

    return (
        <div>
            <h2>Login</h2>
            <form method='POST' onSubmit={event => handleLogin(event)}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
