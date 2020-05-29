import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  eventData: eventReducer,
  userData: userReducer,
});

export default reducers;
