import { message } from "antd";

export const saveSessionToLocalStorage = (session) => {
      
  // Save the session tokens to localstorage
  // TODO: Use cookies instead
  // https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
  localStorage.setItem("cognitoAccessToken", session.accessToken.jwtToken);
  localStorage.setItem("cognitoIdToken", session.idToken.jwtToken);
  localStorage.setItem("cognitoRefreshToken", session.refreshToken.token);

};

export const checkCognitoUser = (user) => {
  try {
    if(!user.attributes) {
      throw new Error("There is a problem with the current Cognito user! It does not contain any user attributes.");
    }
    else if(!user.attributes["custom:mongoid"]) {
      throw new Error("There is a problem with the current Cognito user! It does not contain your id.");
    }
  }
  catch(err) {
    message.error(err.message);
    throw err;
  }
};