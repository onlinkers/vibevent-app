import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

interface Props {
  type?: string;
}

const NotFound: React.FunctionComponent<Props> = ({ type = "page" }) => {
  const history = useHistory();
  return (
    <div className="Page--full--center" style={{ flexDirection: "column" }}>
      <h1>404: Not Found</h1>
      <p>Sorry, the {type} you are looking for cannot be found</p>
      <br />
      <Button type="primary" onClick={() => history.push("/")}>Home</Button>
      <Button type="default" onClick={() => history.goBack()}>Go Back</Button>
    </div>
  );
};

export default NotFound;
