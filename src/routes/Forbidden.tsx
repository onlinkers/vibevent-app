import React from "react";
import { Link, useHistory } from "react-router-dom";

// For redirecting from PrivateRoute
const Forbidden = () => {
  const history = useHistory();
  return (     
    <div className="Page--center" style={{ flexDirection: "column" }}>
      <h1>403: Forbidden</h1>
      <p>
                Sorry! The current account does not have the necessary permissions to access the page.
        <br />
                Please log in with a different account with admin privileges
      </p>
      <Link to="/auth/login"><button color="primary">Log In</button></Link>
      <p><button color="primary" onClick={() => history.goBack()}>Go Back</button></p>
    </div>   
  );
};

export default Forbidden;