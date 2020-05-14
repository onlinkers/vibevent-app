import {
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
} from "types/store";

export const fetchAllEventsRequest = () => {
  return {
    type: FETCH_ALL_EVENTS_REQUEST,
  };
};

export const fetchAllEventsSuccess = (events) => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    payload: events,
  };
};

export const fetchAllEventsFailure = (error) => {
  return {
    type: FETCH_ALL_EVENTS_FAILURE,
    payload: error,
  };
};

// action creator
const fetchAllEvents = () => {
  return (dispatch) => {};
};
