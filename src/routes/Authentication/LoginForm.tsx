import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const LoginForm: React.FunctionComponent = () => {
  return (
    <div className="Page--center">
      <div className="AuthForm LoginForm">
        <h1>Log In</h1>
        <input placeholder="Email"></input>
        <input placeholder="Password"></input>
        <Link to="/discover"><button>Log In</button></Link>
        <p>Don&apos;t have an account? <Link to="/auth/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
