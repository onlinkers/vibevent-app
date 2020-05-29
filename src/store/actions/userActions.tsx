import { UserGetPayload, UserCreatePayload } from "types/store";
import {
    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
    SAVE_USER_DATA,
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

export const saveCognitoUser = (cognitoUser: any) => {
    return {
        type: SAVE_COGNITO_USER,
        payload: cognitoUser,
    };
};

// action creator
export const fetchUserData = (id) => {
    return async (dispatch) => {
        try {
            dispatch(fetchUserDataRequest());
            const response = await userService.getUserData({ id });
            const user = response.data;
            dispatch(fetchUserDataSuccess(user));
        }
        catch(error) {
            dispatch(fetchUserDataFailure(error.message));
        }
    };
};