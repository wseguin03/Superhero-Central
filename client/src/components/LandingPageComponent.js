import React from 'react';
import './LandingPageComponent.css';

function LandingPageComponent() {
    return (
        <div className="landing-page">
            <h1>Superhero Select</h1>
            <div className="button-container">
                <button className="login-button">Login</button>
                <button className="signup-button">Sign Up</button>
            </div>
        </div>
    );
}

export default LandingPageComponent;