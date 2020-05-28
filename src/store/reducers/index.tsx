import { combineReducers } from "redux";
import allEventsReducer from "./allEventsReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  eventData: allEventsReducer,
  userData: userReducer,
});

export default reducers;
