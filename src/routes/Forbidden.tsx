import React from "react";
import { Link } from "react-router-dom";

// For redirecting from PrivateRoute
const Forbidden = () => {
  return (     
    <div className="Page--center" style={{ flexDirection: "column" }}>
      <h1>403: Forbidden</h1>
      <p>
                Sorry! The current account does not have the necessary permissions to access the page.
        <br />
                Please log in with a different account with admin privileges
      </p>
      <Link to="/"><button color="primary">Home</button></Link>
    </div>   
  );
};

export default Forbidden;