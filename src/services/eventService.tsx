import api from "../api";
import { apiErrorHandler } from "../popup";

export default {
  getAllEvents: async () => {
    try {
      const results = await api.get("/events");
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  getEventsByIds: async ({ ids }) => {
    try {
      // check if ids is still an array
      let eventIds = ids;
      if(typeof ids !== "string") eventIds = ids.join(",");
      const results = await api.get(`/events/${eventIds}`);
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
