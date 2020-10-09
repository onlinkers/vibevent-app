import api from "../api";
import { apiErrorHandler } from "../popup";

export default {
  getUsers: async({ withEvents = true }) => {
    try {
      const url = withEvents ? "/users?withEvents=true" : "/users?withEvents=false";
      const results = await api.get(url);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
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
      const results = await api.post("/users", payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  setUser: async ({ id, payload }) => {
    try {
      const results = await api.put(`/users/${id}`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const results = await api.delete(`/users/${id}`);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  saveEvent: async ({ id, payload }) => {
    try {
      const results = await api.patch(`/users/${id}/events_saved`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
};
