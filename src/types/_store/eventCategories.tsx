import {
  FETCH_ALL_EVENT_CATEGORIES_REQUEST,
  FETCH_ALL_EVENT_CATEGORIES_SUCCESS,
  FETCH_ALL_EVENT_CATEGORIES_FAILURE,
} from "constants/index";

export interface EventCategoriesPayload {
  [key: string]: string
}

export interface EventCategoriesState {
  loading: boolean;
  data: EventCategoriesPayload;
  error: string;
}

export interface FetchAllEventCategoriesAction {
  type:
    | typeof FETCH_ALL_EVENT_CATEGORIES_REQUEST
    | typeof FETCH_ALL_EVENT_CATEGORIES_SUCCESS
    | typeof FETCH_ALL_EVENT_CATEGORIES_FAILURE;
  payload?: any;
}