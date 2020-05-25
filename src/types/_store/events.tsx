import { Event } from "types/props";

import {
  FETCH_EVENT_DATA_REQUEST,
  FETCH_ALL_EVENT_DATA_SUCCESS,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_EVENT_CATEGORIES_SUCCESS,
  FETCH_EVENT_CATEGORIES_FAILURE,
} from "constants/index";

// PAYLOAD
export interface EventsPayload {
  [key: string]: Event
}

export interface EventCategoriesPayload {
  [key: string]: string
}

// STORE STATE
export interface EventDataState {
  loading: boolean;
  events: EventsPayload;
  eventCategories: EventCategoriesPayload
  errors: string[];
}

// ACTIONS
export interface FetchEventDataAction {
  type:
    | typeof FETCH_EVENT_DATA_REQUEST
    | typeof FETCH_ALL_EVENT_DATA_SUCCESS
    | typeof FETCH_ALL_EVENTS_SUCCESS
    | typeof FETCH_ALL_EVENTS_FAILURE
    | typeof FETCH_EVENT_CATEGORIES_SUCCESS
    | typeof FETCH_EVENT_CATEGORIES_FAILURE;
  payload?: any;
}