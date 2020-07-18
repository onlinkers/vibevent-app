import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { message } from "antd";
import Form, { TextInput } from "components/forms";

import { AppContext } from "context/AppContext";
import { saveUserData, saveCognitoUser } from "store/actions/userActions";

interface Props {
  saveUserData: Function;
  saveCognitoUser: Function;
}

const LoginForm: React.FunctionComponent<Props> = (props) => {

  const history = useHistory();
  const { session } = useContext(AppContext);
  const { setIsAuthenticated } = session;
  const { saveUserData, saveCognitoUser } = props;

  const logIn = async (formValues) => {
    const { email, password } = formValues;
    if(!email || !password) return null;

    const user = await Auth.signIn(email, password);
    const session = user.signInUserSession;

    if(!user.attributes) {
      message.error("There is a problem with the current Cognito user! It does not contain your id.");
    }
    else {
      saveUserData({
        _id: user.attributes["custom:mongoid"],
        role: user.attributes["custom:role"],
        username: user.attributes.preferred_username,
        email: user.attributes.email,
        firstName: user.attributes.given_name,
        lastName: user.attributes.family_name
      });
    }
    saveCognitoUser(user);

    // Save the session tokens to localstorage
    // TODO: Use cookies instead
    // https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
    localStorage.setItem("cognitoAccessToken", session.accessToken.jwtToken);
    localStorage.setItem("cognitoIdToken", session.idToken.jwtToken);
    localStorage.setItem("cognitoRefreshToken", session.refreshToken.token);

  };

  const logInComplete = async () => {
    setIsAuthenticated(true);
    history.push("/");
  };

  const logInFail = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="Page--full--center">
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

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData: (payload) => dispatch(saveUserData(payload)),
    saveCognitoUser: (payload) => dispatch(saveCognitoUser(payload))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
