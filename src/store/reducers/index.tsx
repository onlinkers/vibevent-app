import { combineReducers } from "redux";
import allEventsReducer from "./allEventsReducer";

const reducers = combineReducers({
  events: allEventsReducer,
});

export default reducers;
