import api from "../api";
import { apiErrorHandler } from "../popup";
import { createQueryString } from "./_utils";

export default {
  getAllEvents: async ({ query = {} }) => {
    try {
      const queryString = createQueryString(query);
      const results = await api.get(`/events?${queryString}`);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  getEventsByIds: async ({ ids, query = {} }) => {
    try {
      // check if ids is still an array
      let eventIds = ids;
      if(typeof ids !== "string") eventIds = ids.join(",");
      // form queries, if any
      const queryString = createQueryString(query);
      const results = await api.get(`/events/${eventIds}/${queryString}`);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  createEvent: async (payload) => {
    try {
      const results = await api.post("/events", payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  setEvent: async ({ id, payload }) => {
    try {
      const results = await api.put(`/events/${id}`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  deleteEvent: async ({ id }) => {
    try {
      const results = await api.delete(`/events/${id}`);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },

  updateEventHost: async ({ id, payload }) => {
    try {
      const results = await api.patch(`/events/${id}/host`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },

  // EVENT CATEGORIES
  getAllEventCategories: async () => {
    try {
      const results = await api.get("/categories");
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  }
};
