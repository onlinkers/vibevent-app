import React from "react";
import { Link } from "react-router-dom";

const Home: React.FunctionComponent = () => {
  return (
    <div className="Page">
            Home Page
      <Link to="/auth/login"><button>Log In</button></Link>
    </div>
  );
};

export default Home;
