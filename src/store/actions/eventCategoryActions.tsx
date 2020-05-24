import {
    FETCH_ALL_EVENT_CATEGORIES_REQUEST,
    FETCH_ALL_EVENT_CATEGORIES_SUCCESS,
    FETCH_ALL_EVENT_CATEGORIES_FAILURE,
  } from "constants/index";
  
  import { EventCategoriesPayload } from "types/store";
  
  import eventService from "services/eventService";
  
  const fetchAllEventCategoriesRequest = () => {
    return {
      type: FETCH_ALL_EVENT_CATEGORIES_REQUEST,
    };
  };
  
  const fetchAllEventCategoriesSuccess = (eventCategories: EventCategoriesPayload) => {
    return {
      type: FETCH_ALL_EVENT_CATEGORIES_SUCCESS,
      payload: eventCategories,
    };
  };
  
  const fetchAllEventCategoriesFailure = (error: string) => {
    return {
      type: FETCH_ALL_EVENT_CATEGORIES_FAILURE,
      payload: error,
    };
  };
  
  // action creator
  export const fetchAllEventCategories = () => {
    return (dispatch) => {
      dispatch(fetchAllEventCategoriesRequest());
      eventService
        .getAllEventCategories()
        .then((response) => {
          const eventCategories = response.data;
          dispatch(fetchAllEventCategoriesSuccess(eventCategories));
        })
        .catch((error) => {
          dispatch(fetchAllEventCategoriesFailure(error.message));
        });
    };
  };
  