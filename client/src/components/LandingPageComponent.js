import React, { useEffect } from 'react';
import './LandingPageComponent.css';
import { Row } from 'react-bootstrap';

function LandingPageComponent() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // useEffect(()=>{
    //     const userInfo = localStorage.getItem('userInfo');
    //     if(userInfo){
    //         history.push('/mylists')
    //     }
    // },[history])

    return (
        <div className="landing-page">
            <div className='landing-page-main-container'>
                <h2>A place to see all your favourite superheros!</h2>

                {userInfo ? (
                    <>
                        <div id='welcome-text'>
                            <h4>Welcome {userInfo.username}</h4>
                        </div>
                        <div className="button-container">
                            <div>
                                <a href="/mylists" className="login-button">My Lists</a>
                            </div>
                            <div>
                                <a href="/" className="signup-button" onClick={()=>{
                                    localStorage.removeItem('userInfo')
                                    window.location.reload()
                                }}
                                >Logout</a>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="button-container">
                        <div>
                            <a href="/login" className="login-button">Login</a>
                        </div>
                        <div>
                            <a href="/register" className="signup-button">Sign Up</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
                }
export default LandingPageComponent;