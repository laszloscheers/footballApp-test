import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './register.css';
import Navbar from '../../components/Navbar/Navbar';
import { registerUser } from '../../firebase';




const Register = () => {


    // Setting up references for form inputs
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordVerifyRef = useRef();
    
    // React-router-dom Method for pushing to different page
    const history = useNavigate()



    // Method for handling registration of a user
    const handleRegistration = async e => {
        e.preventDefault();

        // Check that 2 passwords are the same - if not throw an alert
        if (passwordVerifyRef.current.value !== passwordRef.current.value) {
            console.log("shit");
            // Send Invalidation message if they dont match
            alert("Passwords don't match");

        } else {
            try {
                // Register User - Functionality imported from Firebase.js
                await registerUser(emailRef.current.value, passwordRef.current.value);
                // Push user to HomePage if registration was successful
                history("/");

            } catch {
                // Throw an alert if there were any problems - NB! fill out more later
                alert("There was a problem");
            }
        }
    };


    return (
        <div className="register">
            <Navbar />

            <div className='signUpForm'>
                <div className="loginWrapper">
                    <div className="loginLeft">
                        {/* Register Logo */}
                        <h3 className="loginLogo">Football App</h3>

                        {/* Register Message */}
                        <span className="loginDesc">Sign up for extra benefits!!</span>
                    </div>

                    <div className="loginRight">
                        <form className="loginBox">
                            {/* Register Inputs */}
                            <input placeholder="Username" required ref={usernameRef} className="loginInput" />
                            <input placeholder="Email" required ref={emailRef} className="loginInput" type="email" />
                            <input placeholder="Password" required ref={passwordRef} className="loginInput" type="password" minLength="6" />
                            <input placeholder="Verify Password" required ref={passwordVerifyRef} className="loginInput" type="password" />

                            {/* Register Button - Handles Registration */}
                            <button className="loginButton" onClick={handleRegistration} type="submit">Sign Up</button>

                            {/* Login Button - Switches to Login Page */}
                            <button className="loginRegisterButton" onClick={() => history("/login")}>Log Into Account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
       
    );
};



export default Register;