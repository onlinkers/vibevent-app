import React, { useContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import ExploreBar from "components/layouts/exporeBar";
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

  const handleSave = (payload) => {
    userService.setUser(payload);
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

  const isLoaded = !loading && !error;

  // Netlify temporary fix for when events and eventcategories are strings
  const userValid = typeof user === "object" && user !== null ? true : false;

  return (
    <React.Fragment>
      <ExploreBar />
      <div className="Page Page--explore">
        {userValid && isLoaded ? (
          <ProfileDetails
            user={user}
            onSave={handleSave}
            redirectEvents={redirectEvents}
            logOut={logOut}
          />
        ) : (
          <div className="Page Error">
            <div onClick={refreshPage}><ReloadOutlined /></div>
            <div className="text--unselectable">{error}</div>
            <Button className="button--clickable" onClick={logOut}>Log Out</Button>
          </div>
        )}
      </div>
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
