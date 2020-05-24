import { combineReducers } from "redux";
import allEventsReducer from "./allEventsReducer";
import eventCategoriesReducer from "./eventCategoriesReducer";

const reducers = combineReducers({
  eventData: allEventsReducer,
  eventCategories: eventCategoriesReducer,
});

export default reducers;
