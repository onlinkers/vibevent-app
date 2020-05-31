import { message } from "antd";

// TODO: log errors to sentry
export const apiErrorHandler = (err) => {

  const REQUEST=`${err.response.config.method.toUpperCase()} ${err.response.config.url}`;
  const EXTENDED_REQUEST = `${err.response.config.method.toUpperCase()} ${err.response.config.baseURL}${err.response.config.url}`;
  let errorMessage = `UNDEFINED ERROR for ${REQUEST}! ${err.message}`;

  // If in production stage
  if(process.env.NODE_ENV === "production") errorMessage = "An error occured! Please contact our customer service team if problem persists.";
  // if axios error
  else if(err.isAxiosError) errorMessage = `AXIOS ERROR: ${err.message} | REQUEST: ${EXTENDED_REQUEST}`;
  // if the endpoint is available (not axios and not a string response)
  else if(!err.isAxiosError && err.response.data !== "string") errorMessage = `API ERROR for ${REQUEST} | ${err.response.status} RESPONSE: ${err.response.data.name} - ${err.response.data.message}`;

  // finally, log it
  message.error(errorMessage);

};