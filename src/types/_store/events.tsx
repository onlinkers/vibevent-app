import { Event } from "types/props";

import {
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
} from "constants/index";

export interface EventsPayload {
  [key: string]: Event
}

export interface EventsState {
  loading: boolean;
  events: EventsPayload;
  error: string;
}

export interface FetchAllEventsAction {
  type:
    | typeof FETCH_ALL_EVENTS_REQUEST
    | typeof FETCH_ALL_EVENTS_SUCCESS
    | typeof FETCH_ALL_EVENTS_FAILURE;
  payload?: any;
}