import api from "../api";
import { apiErrorHandler } from "./_errorHandlers";

export default {
  getUsersByIds: async ({ ids }) => {
    try {
      // check if ids is still an array
      let userIds = ids;
      if(typeof ids !== "string") userIds = ids.join(",");
      const results = await api().get(`/users/${userIds}`);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  createUser: async (payload) => {
    try {
      const results = await api().post("/user", payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  updateUser: async ({ id, payload }) => {
    try {
      const results = await api().put(`/user/${id}`, payload);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const results = await api().delete(`/user/${id}`);
      return results;
    } catch(err) {
      apiErrorHandler(err);
      throw err;
    }
  },
};
