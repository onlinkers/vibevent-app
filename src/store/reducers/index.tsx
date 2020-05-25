import { combineReducers } from "redux";
import eventReducer from "./eventReducer";

const reducers = combineReducers({
  eventData: eventReducer
});

export default reducers;
