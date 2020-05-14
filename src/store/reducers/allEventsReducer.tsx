import { EventListLoading } from "types/store";

// replace with axios
import { apiFetch } from "utils";

const initState: EventListLoading = {
  loading: false,
  events: [],
  error: "",
};

const fetchEvents = async () => {
  const events = await apiFetch("/events", {});
  return events;
  // setEvents(Object.values(events));
  // setEventsLoaded(true);
};

const allEventsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ALL_EVENTS_REQUEST":
      fetchEvents().then((data) => {
        return {
          ...state,
          events: data,
        };
      });
      return state;
    case "FETCH_ALL_EVENTS_SUCCESS":
      return state;
    case "FETCH_ALL_EVENTS_FAILURE":
      return state;
    default:
      return state;
  }
};

export default allEventsReducer;
