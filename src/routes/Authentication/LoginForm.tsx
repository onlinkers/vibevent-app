import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import Form, { TextInput } from "components/shared/form";

import { AppContext } from "context/AppContext";
import { saveCognitoUser, fetchUserData } from "store/actions/userActions";
import { saveSessionToLocalStorage, checkCognitoUser } from "./_utils";

interface Props {
  saveCognitoUser: Function;
  fetchUserData: Function;
}

const LoginForm: React.FunctionComponent<Props> = (props) => {

  const history = useHistory();
  const { session } = useContext(AppContext);
  const { setIsAuthenticated } = session;
  const { saveCognitoUser, fetchUserData } = props;

  const logIn = async (formValues) => {
    try {

      const { email, password } = formValues;
      if(!email || !password) return null;
  
      const user = await Auth.signIn(email, password);
      const session = user.signInUserSession;
  
      // check the contents of the cognito user
      checkCognitoUser(user);

      // fetch user data from database and save into redux
      const userId = user.attributes["custom:mongoid"];
      fetchUserData(userId);
      saveCognitoUser(user);

      saveSessionToLocalStorage(session);

    } catch(err) {

      Auth.signOut();
      throw err;

    }

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
    saveCognitoUser: (payload) => dispatch(saveCognitoUser(payload)),
    fetchUserData: (userId) => dispatch(fetchUserData(userId))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
