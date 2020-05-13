import { EventList, EventActionTypes } from "types/store";

const initState: EventList = {
  events: [],
};

const eventReducer = (state = initState, action: EventActionTypes) => {
  switch (action.type) {
    case "setGeneralEvents":
      return state;
    case "setLocalEvent":
      return state;
    default:
      return state;
  }
};

export default eventReducer;
