// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user', {
                username,
                email,
                password,
                age
            });
            console.log('Response:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            // navigate('/');
            setEmail('');
            setPassword('');
            setUsername('')
            setAge(0)
        }

    };

    return (
        <div>
            <h2>Register</h2>
            <form method='POST' onSubmit={(event) => handleRegister(event)}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
