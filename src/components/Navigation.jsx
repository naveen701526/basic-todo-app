// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul style={{
                display: 'flex',
                listStyle: 'none',
                backgroundColor: 'black',
                color: 'white',
                padding: '20px',

                justifyContent: 'space-between'
            }}>
                <li><Link style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }} to={`/`}>Home</Link></li>
                <li><Link style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to={`/login`}>Login</Link></li>
                <li><Link style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }} to={`/register`}>Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
