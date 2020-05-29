import React, { useContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { User } from "types/props";

import "./index.css";

import { AppContext } from "context/AppContext";
import { clearUserData, fetchUserData } from "store/actions/userActions";

interface Props {
    clearUserData: Function;
    fetchUserData: Function;
    loading: Boolean,
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

  const { _id: userId } = user;

  const history = useHistory();
  const { session } = useContext(AppContext);
  const { setIsAuthenticated } = session;
    
  const refreshPage = () => {
    // A lil react-router hack to refresh the page
    history.push("/");
    history.goBack();
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
  }, [fetchUserData, userId]);

  const isLoaded = !loading && !error;

  return isLoaded ? (
    <div className="Page--center Profile">
      <div className="notes">{JSON.stringify(user)}</div>
      <Button onClick={logOut}>LogOut</Button>
    </div>
  ) : (
    <div className="Page Error">
      <div onClick={refreshPage}><ReloadOutlined /></div>
      <div>{error}</div>
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
    clearUserData: () => dispatch(clearUserData()),
    fetchUserData: (userId) => dispatch(fetchUserData(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
