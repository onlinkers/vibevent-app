import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="Page--center" style={{ flexDirection: "column" }}>
      <h1>404: Not Found</h1>
      <p>Sorry, the page you are looking for cannot be found</p>
      <br />
      <Button type="primary" onClick={() => history.push("/")}>Home</Button>
      <Button type="default" onClick={() => history.goBack()}>Go Back</Button>
    </div>
  );
};

export default NotFound;
