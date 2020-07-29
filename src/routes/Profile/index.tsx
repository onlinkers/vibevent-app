import React, { useContext } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import popup from "popup";
import { Button, Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import Navbar from "components/layouts/navbar";
import ProfileDetails from "./ProfileDetails";

import "./index.scss";
import { User } from "types/props";

import { AppContext } from "context/AppContext";
import userService from "services/userService";
import { clearUserData } from "store/actions/userActions";

interface Props {
    clearUserData: Function;
    loading: boolean,
    error: string,
    user: User;
}

const Profile: React.FunctionComponent<Props> = (props) => {

  const {
    clearUserData,
    loading,
    error,
    user
  } = props;

  const history = useHistory();
  const { session } = useContext(AppContext);
  const { setIsAuthenticated } = session;

  const handleSave = async (payload) => {
    await userService.setUser(payload);
    popup.success("User changes saved!");
  };
    
  const refreshPage = () => {
    // A lil react-router hack to refresh the page
    history.push("/empty");
    history.goBack();
  };

  const redirectEvents = () => {
    history.push("/event/dashboard");
  };

  const logOut = async () => {
    // clear the tokens in local storage
    localStorage.clear();
    // set app context
    setIsAuthenticated(false);
    // clear redux from user
    clearUserData();
    // finally, sign out
    await Auth.signOut();
    // redirect to home after
    history.push("/");
  };

  return (
    <div className="Page">
      <Navbar />
      {loading && <div className="Page--full Loader"><Spin/></div>}
      {!loading && (error ? (
        <div className="Page--full Error">
          <div onClick={refreshPage}><ReloadOutlined /></div>
          <div className="t--unselectable">{error}</div>
          <Button className="button--clickable" onClick={logOut}>Log Out</Button>
        </div>
      ) : (
        <ProfileDetails
          user={user}
          onSave={handleSave}
          redirectEvents={redirectEvents}
          logOut={logOut}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ userData }) => {
  return {
    loading: userData.loading,
    error: userData.error,
    user: userData.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserData: () => dispatch(clearUserData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
