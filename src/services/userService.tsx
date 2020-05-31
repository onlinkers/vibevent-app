import api from "../api";
import { message } from "antd";
// TODO: Error handling with antd message
// Enhanced try/catch stuff

export default {
  getUserData: ({ id }) => {
    return api().get(`/users/${id}`);
  },
  createUser: async (payload) => {
    try {
      const results = await api().post("/user", payload);
      return results;
    } catch(err) {
      message.error(`API ERROR: ${err.response.data.name}`);
      throw err;
    }
  },
  updateUser: ({ id, payload }) => {
    return api().put(`/user/${id}`, payload);
  },
  deleteUser: ({ id }) => {
    return api().delete(`/user/${id}`);
  },
};
