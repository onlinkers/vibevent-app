import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const SignupForm: React.FunctionComponent = () => {
    return (
        <div className="Page--center">
            <div className="AuthForm SignupForm">
                <h1>Sign Up</h1>
                <input placeholder="Email"></input>
                <input placeholder="Password"></input>
                <input placeholder="Confirm Password"></input>
                <Link to="/auth/signup"><button>Sign Up</button></Link>
                <p>Have an account? <Link to="/auth/login">Log In</Link></p>
            </div>
        </div>
    );
};

export default SignupForm;
