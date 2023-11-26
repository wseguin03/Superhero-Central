import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPageComponent.css';

function LandingPageComponent() {
    return (
        <div className="landing-page">
            <div className='landing-page-main-container'>
                <h2>A place to see all your favourite superheros!</h2>
                <div className="button-container">
                    <Link to="/login" className="login-button">Login</Link>
                    <Link to="/register" className="signup-button">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPageComponent;