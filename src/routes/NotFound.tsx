import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
	const history = useHistory();
	return (
        <div className="Page--center" style={{ flexDirection: "column" }}>
            <h1>404: Not Found</h1>
			<p>Sorry, the page you are looking for cannot be found</p>
			<p><button color="primary" onClick={() => history.goBack()}>Go Back</button></p>
		</div>
	);
};

export default NotFound;
