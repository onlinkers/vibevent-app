/* eslint-disable no-throw-literal */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use((response) => {
  // Do something with response data

  // Netlify error where API calls return 200 status but no data
  if(typeof response.data === "string" && response.data.includes("doctype")) {
    throw ({
      response: {
        config: response.config,
        headers: response.headers,
        request: response.request,
        status: 503,
        statusText: "StringResponseDataNotAccepted",
        data: "error"
      }
    });
  }
  return response;
}, (error) => {
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstance;