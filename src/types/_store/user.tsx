import { User, Image } from "types/props";

import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  SAVE_USER_DATA,
  SAVE_COGNITO_USER
} from "constants/index";

// PAYLOAD
export type UserGetPayload = User;

export interface UserCreatePayload {
  data: {
    id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    profilePhoto?: Image;
  }
  cognitoUser?: any;
}

// STORE STATE
export interface UserDataState {
  loading: boolean;
  user: User | {};
  cognitoUser?: any;
  error: string;
}

// ACTIONS
export interface FetchUserDataAction {
  type: typeof FETCH_USER_DATA_REQUEST
    | typeof FETCH_USER_DATA_SUCCESS
    | typeof FETCH_USER_DATA_FAILURE;
  payload?: UserGetPayload;
}

export interface SaveUserDataAction {
  type: typeof SAVE_USER_DATA;
  payload: UserCreatePayload;
}

export interface SaveCognitoUserAction {
  type: typeof SAVE_COGNITO_USER;
  payload: any;
}
