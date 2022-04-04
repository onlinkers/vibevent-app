import api from "../api";
import { apiErrorHandler } from "../popup";
import { createQueryString } from "./_utils";

import DEFAULT_USER_DATA from "../assets/showcaseData/userData.json";

export default {
  getUsers: async({ query = {} }) => {
    try {
      const queryString = createQueryString(query);
      const url = `/users?${queryString}`;
      const results = await api.get(url);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      // throw err;
      return { data: DEFAULT_USER_DATA };
    }
  },
  getUsersByIds: async ({ ids, query = {} }) => {
    try {
      // check if ids is still an array
      let userIds = ids;
      if(typeof ids !== "string") userIds = ids.join(",");
      const queryString = createQueryString(query);
      const url = `/users/${userIds}?${queryString}`;
      const results = await api.get(url);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      // throw err;
      return { data: DEFAULT_USER_DATA };
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
