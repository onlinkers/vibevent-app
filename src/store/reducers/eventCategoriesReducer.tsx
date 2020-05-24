import { EventCategoriesState, FetchAllEventCategoriesAction } from "types/store";
import {
  FETCH_ALL_EVENT_CATEGORIES_REQUEST,
  FETCH_ALL_EVENT_CATEGORIES_SUCCESS,
  FETCH_ALL_EVENT_CATEGORIES_FAILURE,
} from "constants/index";

const initState: EventCategoriesState = {
  loading: false,
  data: {},
  error: "",
};

const eventCategoriesReducer = (state = initState, action: FetchAllEventCategoriesAction | any) => {
  switch (action.type) {
    case FETCH_ALL_EVENT_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_EVENT_CATEGORIES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_ALL_EVENT_CATEGORIES_FAILURE:
      return {
        loading: false,
        data: { ...state.data },
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventCategoriesReducer;
