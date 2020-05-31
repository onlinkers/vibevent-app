import {
  UserDataState,
  FetchUserDataAction,
  SaveCognitoUserAction,
  UpdateUserDataAction
} from "types/store";
import {
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  SAVE_USER_DATA,
  CLEAR_USER_DATA,
  SAVE_COGNITO_USER
} from "constants/index";

const initState: UserDataState = {
  loading: false,
  user: {},
  cognitoUser: {},
  error: ""
};

const userReducer = (state = initState, action: FetchUserDataAction | UpdateUserDataAction | SaveCognitoUserAction) => {
  switch (action.type) {
    case FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        user: { ...action.payload }
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        user: {},
        cognitoUser: {}
      };
    case SAVE_COGNITO_USER:
      return {
        ...state,
        cognitoUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
