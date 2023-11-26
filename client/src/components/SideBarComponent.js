import React, { useState } from 'react';
import './SideBarComponent.css';

function SideBarComponent() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="sidebar">
            <h3 className='sidebar-title'>Superhero Database</h3>
            <button className = 'switch-sign-in-btn'onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
            </button>
            {isSignUp ? (
                <form className="signup-form">
                    <input type="text" placeholder="Username" className="signup-input" />
                    <input type="password" placeholder="Password" className="signup-input" />
                    <input type="password" placeholder="Confirm Password" className="signup-input" />
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            ) : (
                <form className="signin-form">
                    <input type="text" placeholder="Username" className="signin-input" />
                    <input type="password" placeholder="Password" className="signin-input" />
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
            )}
            {/* Add more content here */}
        </div>
    );
}

export default SideBarComponent;