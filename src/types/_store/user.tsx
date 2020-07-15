import { CognitoUser } from "@aws-amplify/auth";
import { User, Image } from "types/props";

import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
  SAVE_COGNITO_USER
} from "constants/index";

// PAYLOAD
export type UserGetPayload = User;

export interface UserCreatePayload {
  _id?: string;
  firstName: string;
  lastName?: string;
  description?: string;
  username: string;
  email: string;
  profilePhoto?: Image;
  eventsCreated?: Event[];
  eventsInvolved?: Event[];
  eventsSaved?: Event[];
}

// STORE STATE
export interface UserDataState {
  loading: boolean;
  user: User | {};
  cognitoUser: CognitoUser | {};
  error: string;
}

// ACTIONS
export interface FetchUserDataAction {
  type: typeof FETCH_USER_DATA_REQUEST
    | typeof FETCH_USER_DATA_SUCCESS
    | typeof FETCH_USER_DATA_FAILURE;
  payload?: UserGetPayload;
}

export interface UpdateUserDataAction {
  type: typeof SAVE_USER_DATA | typeof CLEAR_USER_DATA;
  payload?: UserCreatePayload;
}

export interface SaveCognitoUserAction {
  type: typeof SAVE_COGNITO_USER;
  payload: CognitoUser;
}
