import {
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
} from "constants/index";

import { EventsPayload } from "types/store";

import eventService from "services/eventService";

const fetchAllEventsRequest = () => {
  return {
    type: FETCH_ALL_EVENTS_REQUEST,
  };
};

const fetchAllEventsSuccess = (events: EventsPayload) => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    payload: events,
  };
};

const fetchAllEventsFailure = (error: string) => {
  return {
    type: FETCH_ALL_EVENTS_FAILURE,
    payload: error,
  };
};

// action creator
export const fetchAllEvents = () => {
  return (dispatch) => {
    dispatch(fetchAllEventsRequest());
    eventService
      .getAllEvents()
      .then((response) => {
        const events = response.data;
        dispatch(fetchAllEventsSuccess(events));
      })
      .catch((error) => {
        dispatch(fetchAllEventsFailure(error.message));
      });
  };
};
