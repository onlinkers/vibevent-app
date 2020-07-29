import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

interface Props {
  type?: string;
  redirectFunction?: () => void;
  redirectString?: string;
  returnFunction?: () => void;
  returnString?: string;
}

const NotFound: React.FunctionComponent<Props> = (props) => {

  const {
    type = "page",
    redirectFunction,
    redirectString,
    returnFunction,
    returnString
  } = props;

  const history = useHistory();
  const defaultRedirect = () => history.push("/");
  const defaultReturn = () => history.goBack();

  return (
    <div className="Page--full--center" style={{ flexDirection: "column" }}>
      <h1>404: Not Found</h1>
      <p>Sorry, the {type} you are looking for cannot be found</p>
      <br />
      <Button type="primary" onClick={redirectFunction || defaultRedirect}>{redirectString || "Home"}</Button>
      <Button type="default" onClick={returnFunction || defaultReturn}>{returnString || "Go Back"}</Button>
    </div>
  );
};

export default NotFound;
