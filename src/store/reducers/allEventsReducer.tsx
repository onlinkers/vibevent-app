import { EventsState, FetchAllEventsAction } from "types/store";
import {
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
} from "constants/index";

const initState: EventsState = {
  loading: false,
  events: {},
  error: "",
};

const allEventsReducer = (state = initState, action: FetchAllEventsAction | any) => {
  switch (action.type) {
    case FETCH_ALL_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload,
        error: "",
      };
    case FETCH_ALL_EVENTS_FAILURE:
      return {
        loading: false,
        events: { ...state.events },
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allEventsReducer;
