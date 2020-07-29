import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import Form, { TextInput } from "components/shared/form";

import userService from "services/userService";

interface Props {
}

const SignupForm: React.FunctionComponent<Props> = () => {

  const history = useHistory();

  const signUp = async (formValues) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password
    } = formValues;

    // Save to the database first
    // "email already used" errors will be thrown here
    const { data } = await userService.createUser({
      firstName, lastName, username, email
    });
    const userId = data.userId;
	
    // Sign up to Cognito userpool
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: firstName,
        family_name: lastName || "",
        email,
        preferred_username: username || "",
        "custom:mongoid": userId,
        "custom:role": "USER"
      }
    });

    return email;
  };

  return (
    <div className="Page--full--center">
      <Form
        title="Sign Up"
        description="Enter your login details below to get started!"
        submitText="Sign Up"
        extraButtons={<p>Have an account? <Link to="/auth/login">Log In</Link></p>}
        name="basic"
        className="AuthForm SignupForm"
        size="large"
        layout="horizontal"
        scrollToFirstError={true}
        onSubmit={signUp}
        onFinish={(email) => {history.push(`/auth/confirm?email=${email}`);}}
      >
        <TextInput
          name="firstName"
          label="First Name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "A Name is required!",
            },
          ]}
        />
        <TextInput
          name="lastName"
          label="Last Name (optional)"
          hasFeedback
        />
        <TextInput
          name="username"
          label="Username (optional)"
        />
        <TextInput
          name="email"
          label="Email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
            {
              type: "email",
              message: "Email is not valid!",
            }
          ]}
        />
        <TextInput
          name="password"
          label="Password"
          variant="Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Password is required!"
            },
            {
              validator: (rule, value) => {
                const mismatches: string[] = [];
                if(value && !value.match(/[0-9]/)) {
                  mismatches.push("1 numeric character");
                }
                if(value && !value.match(/[a-z]/)) {
                  mismatches.push("1 lowercase letter");
                }
                if(value && !value.match(/[A-Z]/)) {
                  mismatches.push("1 uppercase letter");
                }
                if(value && !value.match(/[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|]/)) {
                  mismatches.push("1 special character");
                }
                if(value && value.length < 8) {
                  mismatches.push("and must be 8 characters or longer");
                }
                if(mismatches.length) return Promise.reject(`Your password must contain at least: ${mismatches.join(", ")}!`);
                return Promise.resolve();
              }
            }
          ]}
        />
        <TextInput
          name="passwordConfirm"
          label="Confirm Password"
          variant="Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm the password!"
            },
            ({ getFieldValue }) => ({
              validator: (rule, value) => {
                if (!value || getFieldValue("password") === value) return Promise.resolve();
                return Promise.reject("The two passwords that you entered do not match!");
              },
            }),
          ]}
        />
      </Form>
    </div>
  );
};


export default SignupForm;
