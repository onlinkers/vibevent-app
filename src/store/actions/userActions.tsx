import { CognitoUser } from "@aws-amplify/auth";
import { UserGetPayload, UserCreatePayload } from "types/store";
import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
  SAVE_COGNITO_USER
} from "constants/index";
  
import userService from "services/userService";


const fetchUserDataRequest = () => {
  return {
    type: FETCH_USER_DATA_REQUEST,
  };
};

const fetchUserDataSuccess = (userData: UserGetPayload) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: userData,
  };
};

const fetchUserDataFailure = (error) => {
  return {
    type: FETCH_USER_DATA_FAILURE,
    payload: error,
  };
};

export const saveUserData = (userData: UserCreatePayload) => {
  return {
    type: SAVE_USER_DATA,
    payload: userData,
  };
};

export const saveCognitoUser = (cognitoUser: CognitoUser) => {
  return {
    type: SAVE_COGNITO_USER,
    payload: cognitoUser,
  };
};

export const clearUserData = () => {
  return {
    type: CLEAR_USER_DATA
  };
};

// action creator
export const fetchUserData = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserDataRequest());
      // need to always get full event data when saving to redux
      const { data } = await userService.getUsersByIds({ ids: id, query: { withEvents: true } });
      const user = data[id];
      if(!user) throw new Error("User data could not be found in the database!");
      dispatch(fetchUserDataSuccess(user));
    }
    catch(error) {
      dispatch(fetchUserDataFailure(error.message));
    }
  };
};