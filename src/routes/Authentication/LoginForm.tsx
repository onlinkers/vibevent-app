import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { Form, Button, message } from "antd";
import TextInput from "components/forms/inputs/textInput";

import { AppContext } from "context/AppContext";


import "./index.css";

const LoginForm: React.FunctionComponent = () => {

	const history = useHistory();
	const { session } = useContext(AppContext);
	const { setIsAuthenticating, setIsAuthenticated } = session;

	const logIn = async (formValues) => {
		try {
			const { email, password } = formValues;
			if(!email || !password) return null;

			setIsAuthenticating(true);
			const user = await Auth.signIn(email, password);
			const session = user.signInUserSession;

			// Save the session tokens to localstorage
			// TODO: Use cookies instead
			// https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
			localStorage.setItem("cognitoAccessToken", session.accessToken);
			localStorage.setItem("cognitoIdToken", session.idToken);
			localStorage.setItem("cognitoRefreshToken", session.refreshToken);

			setIsAuthenticated(true);
			setIsAuthenticating(false);
			history.push("/");
		} catch(err) {
			message.error(err.mesage);
		}
	};

	return (
		<div className="Page--center">
			<Form
				name="basic"
				className="AuthForm SignupForm"
				size="large"
				layout="horizontal"
				onFinish={logIn}
			>
				<div className="topWrapper">
					<div className="header">
						<h1 className="title">Log In</h1>
						<h4 className="description">Log into your account!</h4>
					</div>
					
					<div className="content">
						<TextInput
							name="email"
							label="Email"
							rules={[
								{
									required: true,
									message: "Enter your email!",
								},
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
					</div>
				</div>

				<div className="footer">
					<Button type="primary" htmlType="submit">Log In</Button>
					<p>Don&apos;t have an account? <Link to="/auth/signup">Sign Up</Link></p>
				</div>
			</Form>
		</div>
	);
};

export default LoginForm;
