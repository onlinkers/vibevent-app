import { EventList, EventActionTypes } from "types/store";

const initState: EventList = {
  events: [],
};

const eventReducer = (state = initState, action: EventActionTypes) => {
  return state;
};

export default eventReducer;
