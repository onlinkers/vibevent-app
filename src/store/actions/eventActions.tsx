import {
  FETCH_EVENT_DATA_REQUEST,
  FETCH_ALL_EVENT_DATA_SUCCESS,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_EVENT_CATEGORIES_SUCCESS,
  FETCH_EVENT_CATEGORIES_FAILURE,
} from "constants/index";

import {
  EventsPayload,
  EventCategoriesPayload
} from "types/store";

import eventService from "services/eventService";

// ACTIONS
const fetchEventDataRequest = () => {
  return {
    type: FETCH_EVENT_DATA_REQUEST
  };
};

const fetchEventDataSuccess = (events: EventsPayload, eventCategories: EventCategoriesPayload) => {
  return {
    type: FETCH_ALL_EVENT_DATA_SUCCESS,
    payload: { events, eventCategories }
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

  
const fetchEventCategoriesSuccess = (eventCategories: EventCategoriesPayload) => {
  return {
    type: FETCH_EVENT_CATEGORIES_SUCCESS,
    payload: eventCategories,
  };
};

const fetchEventCategoriesFailure = (error: string) => {
  return {
    type: FETCH_EVENT_CATEGORIES_FAILURE,
    payload: error,
  };
};

// ACTION CREATORS

// Fetch all events + event categories
export const fetchAllEventData = () => {
  return async (dispatch) => {
    dispatch(fetchEventDataRequest());
    let events = {};
    let eventCategories = {};
    
    // Get all events
    try {
      const { data } = await eventService.getAllEvents({ query: { withHosts: true } });
      events = data;
    }
    catch (error) {
      dispatch(fetchAllEventsFailure(error.message));
    }
    
    // Get all event categories
    try {
      const { data } = await eventService.getAllEventCategories();
      eventCategories = data;
    }
    catch (error) {
      dispatch(fetchEventCategoriesFailure(error.message));
    }

    // Eventually, save all the data anyway
    dispatch(fetchEventDataSuccess(events, eventCategories));
  };
};

// Only get events
export const fetchAllEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchEventDataRequest());
      const { data } = await eventService.getAllEvents({ query: { withHosts: true } });
      const events = data;
      dispatch(fetchAllEventsSuccess(events));
    }
    catch(error) {
      dispatch(fetchAllEventsFailure(error.message));
    };
  };
};

// Only get event categories
export const fetchEventCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchEventDataRequest());
      const { data } = await eventService.getAllEventCategories();
      const eventCategories = data;
      dispatch(fetchEventCategoriesSuccess(eventCategories));
    }
    catch(error) {
      dispatch(fetchEventCategoriesFailure(error.message));
    };
  };
};
  