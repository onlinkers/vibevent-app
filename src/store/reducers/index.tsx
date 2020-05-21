import { combineReducers } from "redux";
import allEventsReducer from "./allEventsReducer";

const reducers = combineReducers({
  eventData: allEventsReducer,
});

export default reducers;
