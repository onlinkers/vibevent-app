import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { message } from "antd";
import Form, { TextInput } from "components/forms";

import { AppContext } from "context/AppContext";

import "./index.css";

const LoginForm: React.FunctionComponent = () => {

  const history = useHistory();
  const { session } = useContext(AppContext);
  const { setIsAuthenticating, setIsAuthenticated } = session;

  const logIn = async (formValues) => {
    const { email, password } = formValues;
    if(!email || !password) return null;

    setIsAuthenticating(true);
    const user = await Auth.signIn(email, password);
    const session = user.signInUserSession;

    // Save the session tokens to localstorage
    // TODO: Use cookies instead
    // https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
    localStorage.setItem("cognitoAccessToken", JSON.stringify(session.accessToken));
    localStorage.setItem("cognitoIdToken", JSON.stringify(session.idToken));
    localStorage.setItem("cognitoRefreshToken", JSON.stringify(session.refreshToken));

  };

  const logInComplete = async () => {
    setIsAuthenticated(true);
    setIsAuthenticating(false);
    history.push("/");
  };

  const logInFail = (err) => {
    setIsAuthenticating(false);
    setIsAuthenticated(false);
    message.error(err.message);
  };

  return (
    <div className="Page--center">
      <Form
        title="Log In"
        description="Log into your account!"
        submitText="Log In"
        extraButtons={<p>Don&apos;t have an account? <Link to="/auth/signup">Sign Up</Link></p>}
        name="basic"
        className="AuthForm SignupForm"
        size="large"
        layout="horizontal"
        scrollToFirstError={true}
        onSubmit={logIn}
        onFinish={logInComplete}
        onFail={logInFail}
      >
        <TextInput
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Enter your email!",
            },
            {
              type: "email",
              message: "Email is not valid!",
            }
          ]}
        />
        <TextInput
          name="password"
          variant="Password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Enter your password!",
            },
          ]}
        />
      </Form>
    </div>
  );
};

export default LoginForm;
