import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

const AuthRedirect: React.FunctionComponent<RouteComponentProps> = (props) => {

	const { history } = props;

	useEffect(() => {
		setTimeout(() => { history.push("/discover"); }, 2000);
	});

	return (
		<div className="Page">
            Redirecting...
		</div>
	);
};

export default AuthRedirect;
