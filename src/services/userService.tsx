import api from "../api";
// TODO: Error handling with antd message
// Enhanced try/catch stuff

export default {
  getUserData: ({ id }) => {
    return api().get(`/user/${id}`);
  },
  createUser: (payload) => {
    return api().post("/user", payload);
  },
  updateUser: ({ id, payload }) => {
    return api().put(`/user/${id}`, payload);
  },
  deleteUser: ({ id }) => {
    return api().delete(`/user/${id}`);
  },
};
