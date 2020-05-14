import {
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
} from "types/store";

export const fetchEventsRequest = () => {
  return {
    type: FETCH_ALL_EVENTS_REQUEST,
  };
};

export const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    payload: events,
  };
};

export const fetchEventsFailure = (error) => {
  return {
    type: FETCH_ALL_EVENTS_FAILURE,
    payload: error,
  };
};
