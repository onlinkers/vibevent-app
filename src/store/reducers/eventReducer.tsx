import { EventDataState, FetchEventDataAction } from "types/store";
import {
  FETCH_EVENT_DATA_REQUEST,
  FETCH_ALL_EVENT_DATA_SUCCESS,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_EVENT_CATEGORIES_SUCCESS,
  FETCH_EVENT_CATEGORIES_FAILURE,
} from "constants/index";

const initState: EventDataState = {
  loading: false,
  events: {},
  eventCategories: {},
  errors: [], // TODO: Better error handling
};

const eventReducer = (state = initState, action: FetchEventDataAction | any) => {
  switch (action.type) {
    case FETCH_EVENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        errors: [],
      };

    // ALL DATA
    case FETCH_ALL_EVENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload.events,
        eventCategories: action.payload.eventCategories,
      };

    // EVENTS
    case FETCH_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case FETCH_ALL_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        events: { ...state.events },
        errors: [...state.errors, `ALL EVENTS REQUEST ERROR: ${action.payload}`],
      };

    // EVENT CATEGORIES
    case FETCH_EVENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case FETCH_EVENT_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        errors: [...state.errors, `EVENT CATEGORY REQUEST ERROR: ${action.payload}`],
      };
      
    default:
      return state;
  }
};

export default eventReducer;
