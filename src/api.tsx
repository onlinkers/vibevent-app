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

// Response Interceptor
axiosInstance.interceptors.response.use((response) => {

  // Deal with Netlify error where API calls return 200 status but no data
  if(typeof response.data === "string" && response.data.includes("doctype")) {
    console.log("recieved", response); // eslint-disable-line
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

// Request Interceptor
axiosInstance.interceptors.request.use(function (config) {
  // get the id token from local storage
  const rawToken = localStorage.getItem("cognitoIdToken");
  const token = `Bearer ${rawToken}`;
  config.headers.Authorization =  token;

  return config;
});

export default axiosInstance;