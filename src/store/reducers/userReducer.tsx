import { UserDataState, FetchUserDataAction } from "types/store";
import {
    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
} from "constants/index";

const initState: UserDataState = {
  loading: false,
  user: {},
  error: ""
};

const userReducer = (state = initState, action: FetchUserDataAction) => {
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
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
