import api from "../api";

export default {
  getAllEvents: () => {
    return api().get("/events");
  },
  getEvent: ({ ids }) => {
    return api().get(`/events/${ids}`);
  },
  createEvent: (payload) => {
    return api().post("/event", payload);
  },
  updateEvent: ({ id, payload }) => {
    return api().put(`/event/${id}`, payload);
  },
  deleteEvent: ({ id }) => {
    return api().delete(`/events/${id}`);
  },
};
