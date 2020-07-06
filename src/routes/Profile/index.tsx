import React, { useContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Button, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import ProfileDetails from "./ProfileDetails";

import { User } from "types/props";

import { AppContext } from "context/AppContext";
import userService from "services/userService";
import { clearUserData, fetchUserData } from "store/actions/userActions";

interface Props {
    clearUserData: Function;
    fetchUserData: Function;
    loading: boolean,
    error: string,
    user: User;
}

const Profile: React.FunctionComponent<Props> = (props) => {

  const {
    clearUserData,
    fetchUserData,
    loading,
    error,
    user
  } = props;

  const userId = user?._id;

  const history = useHistory();
  const { session } = useContext(AppContext);
  const { setIsAuthenticated } = session;

  const handleSave = async (payload) => {
    await userService.setUser(payload);
    message.success("User saved!");
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

  useEffect(() => {
    if(userId) fetchUserData(userId);
  }, []); // eslint-disable-line

  return loading ? null : (
    <React.Fragment>
      {loading && <div className="Page Loader">Loading...</div>}
      {!loading && (error ? (
        <div className="Page Error">
          <div onClick={refreshPage}><ReloadOutlined /></div>
          <div className="t--unselectable">{error}</div>
          <Button className="button--clickable" onClick={logOut}>Log Out</Button>
        </div>
      ) : (
        <div className="Page Page--explore">
          <ProfileDetails
            user={user}
            onSave={handleSave}
            redirectEvents={redirectEvents}
            logOut={logOut}
          />
        </div>
      ))}
    </React.Fragment>
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
    clearUserData: () => dispatch(clearUserData()),
    fetchUserData: (userId) => dispatch(fetchUserData(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
