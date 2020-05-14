import { EventListLoading, EventActionTypes } from "types/store";

// replace with axios
import { apiFetch } from "utils";

const initState: EventListLoading = {
  loading: false,
  events: [],
  error: "",
};

const allEventsReducer = (state = initState, action: EventActionTypes) => {
  switch (action.type) {
    case "FETCH_ALL_EVENTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_ALL_EVENTS_SUCCESS":
      return {
        loading: false,
        events: action.payload,
        error: "",
      };
    case "FETCH_ALL_EVENTS_FAILURE":
      return {
        loading: false,
        events: [...state.events],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allEventsReducer;
