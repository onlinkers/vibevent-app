import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

const AuthRedirect: React.FunctionComponent<RouteComponentProps> = (props) => {

	const { history } = props;

	useEffect(() => {
		// Temporary way to simulate a delayed "sign in"
		// TODO: Replace with authentication cognito logic
		setTimeout(() => { history.push("/discover"); }, 2000);
	});

	return (
		<div className="Page">
            Redirecting...
		</div>
	);
};

export default AuthRedirect;
