import { message } from "antd";

// TODO: log errors to sentry
export const apiErrorHandler = (err) => {

  const REQUEST=`${err.response?.config.method.toUpperCase()} ${err.response?.config.url}`;
  const EXTENDED_REQUEST = `${err.response?.config.method.toUpperCase()} ${err.response?.config.baseURL}${err.response?.config.url}`;
  let errorMessage = `UNDEFINED ERROR for ${REQUEST}! ${err.message}`;

  // If in production stage
  if(!process.env.DEV_LOGS) errorMessage = "An error occured! Please contact our customer service team if problem persists.";
  // if the API could not be reached
  else if(!err.response && err.config) errorMessage = "NETWORK ERROR: API could not be reached/errored out!";
  // if the endpoint is available (and gettting a string response)
  else if(err.response && err.response.data === "error") errorMessage = `API ${err.response.status} ERROR: ${err.response.statusText}`;
  // if other endpoint error
  else if(err.response) errorMessage = `API ${err.response.status} ERROR for ${REQUEST}: ${err.response.data.name} - ${err.response.data.message}`;
  // if axios error
  else if(err.isAxiosError) errorMessage = `AXIOS ERROR: ${err.message} | REQUEST: ${EXTENDED_REQUEST}`;

  // finally, log it
  message.error(errorMessage);

};