import api from "../api";
import { apiErrorHandler } from "./_errorHandlers";

export default {
  getUsersByIds: async ({ ids, withEvents = true }) => {
    try {
      // check if ids is still an array
      let userIds = ids;
      if(typeof ids !== "string") userIds = ids.join(",");
      const url = withEvents ? `/users/${userIds}?withEvents=true` : `/users/${userIds}?withEvents=false`;
      const results = await api.get(url);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  createUser: async (payload) => {
    try {
      const results = await api.post("/user", payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  setUser: async ({ id, payload }) => {
    try {
      const results = await api.put(`/user/${id}`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  updateUser: async ({ id, payload }) => {
    try {
      const results = await api.patch(`/user/${id}`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const results = await api.delete(`/user/${id}`);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  saveEvent: async ({ id, payload }) => {
    try {
      const results = await api.patch(`/user/${id}/events_saved`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
};
