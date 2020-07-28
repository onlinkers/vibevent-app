import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import { getUrlQuery } from "utils";

// For redirecting from PrivateRoute
const Forbidden = () => {
  const history = useHistory();
  const location = useLocation();

  const redirected = getUrlQuery(location.search, "redirected");

  return (     
    <div className="Page--full--center" style={{ flexDirection: "column" }}>
      <h1>403: Forbidden</h1>
      <p>
                Sorry! The current account does not have the necessary permissions to access the page.
        <br />
                Please log in with a different account with admin privileges
      </p>
      <Link to="/auth/login"><button color="primary">Log In</button></Link>
      <p><button color="primary" onClick={() => redirected ? history.go(-2) : history.goBack()}>Go Back</button></p>
    </div>   
  );
};

export default Forbidden;