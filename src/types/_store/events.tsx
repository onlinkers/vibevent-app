import { Event } from "types/props";

export const FETCH_ALL_EVENTS_REQUEST = "FETCH_ALL_EVENTS_REQUEST";
export const FETCH_ALL_EVENTS_SUCCESS = "FETCH_ALL_EVENTS_SUCCESS";
export const FETCH_ALL_EVENTS_FAILURE = "FETCH_ALL_EVENTS_FAILURE";

export interface EventListLoading {
  loading: boolean;
  events: Event[];
  error: string;
}

interface FetchAllEventsAction {
  type:
    | typeof FETCH_ALL_EVENTS_REQUEST
    | typeof FETCH_ALL_EVENTS_SUCCESS
    | typeof FETCH_ALL_EVENTS_FAILURE;
  payload?: any;
}

export type EventActionTypes = FetchAllEventsAction;
