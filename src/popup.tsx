import { message } from "antd";

export const success = (userText = "", devText = "") => {

  const hideDevLogs = !process.env.REACT_APP_DEV_LOGS || process.env.REACT_APP_DEV_LOGS === "false";
  let text = "Success!"; // generic success message

  // If in production environment
  if(hideDevLogs) {
    text = userText || "Success!";
  }
  // If not in production
  else {
    text = devText || userText || "< a success message was not provided >";
  }

  // finally, show the text
  message.success(text);

};

export const error = (userText = "", devText = "") => {

  const hideDevLogs = !process.env.REACT_APP_DEV_LOGS || process.env.REACT_APP_DEV_LOGS === "false";
  let text = "An error occured!"; // generic error message

  // If in production environment
  if(hideDevLogs) {
    text = userText || "An error occured! Please contact our customer service team if problem persists.";
  }
  // If not in production
  else {
    text = devText || userText || "< an error message was not provided >";
  }

  // finally, show the text
  message.error(text);

};

// TODO: log errors to sentry
export const apiErrorHandler = (err) => {

  // Check if in production (cleaner logs)
  const devLogs = process.env.REACT_APP_DEV_LOGS && process.env.REACT_APP_DEV_LOGS !== "false";
  const CONTACT_MESSAGE = "Please contact our customer service team if problem persists.";

  const REQUEST=`${err.response?.config.method.toUpperCase()} ${err.response?.config.url}`;
  const EXTENDED_REQUEST = `${err.response?.config.method.toUpperCase()} ${err.response?.config.baseURL}${err.response?.config.url}`;
  let errorMessage = devLogs ? `UNDEFINED ERROR for ${REQUEST}! ${err.message}` : `An unknown network error occured! ${CONTACT_MESSAGE}`;
  
  // if the API could not be reached
  if(!err.response && err.config) errorMessage = devLogs ? "NETWORK ERROR: API could not be reached/errored out!" : `Network could not be reached! ${CONTACT_MESSAGE}` ;
  // if the endpoint is available (and gettting a string response)
  else if(err.response && err.response.data === "error") errorMessage = devLogs ? `API ${err.response.status} ERROR: ${err.response.statusText}` : `A network error occured! ${CONTACT_MESSAGE}`;
  // if other endpoint error
  else if(err.response) errorMessage = devLogs ? `API ${err.response.status} ERROR for ${REQUEST}: ${err.response.data.name} - ${err.response.data.message}` : err.response.data.message;
  // if axios error
  else if(err.isAxiosError) errorMessage = devLogs ? `AXIOS ERROR: ${err.message} | REQUEST: ${EXTENDED_REQUEST}` : `An error occured while trying to reach network! ${CONTACT_MESSAGE}`;

  // finally, log it
  message.error(errorMessage);
  
};

export default {
  success,
  error
};