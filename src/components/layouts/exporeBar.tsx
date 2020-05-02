import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

interface Props {
    
}

const ExploreBar: React.FunctionComponent<Props> = () => {

	const { innerWidth } = window;

	return (
		<div> { innerWidth >= 800 ? (

			<div className="desktop-explore">
				<Link to="/"><h2 className="explore-title" color="blue">ONLINKER</h2></Link>
				<div className="explore-links">
					<Link to="/event/dashboard">
						<h3 className="explore-link">Dashboard</h3>
					</Link>
					<Link to="/discover">
						<h3 className="explore-link">Discover</h3>
					</Link>
					<Link to="#">
						<h3 className="explore-link">Moments</h3>
					</Link>
					<Link to="#">
						<h3 className="explore-link">Create</h3>
					</Link>
				</div>
				<div className="explore-profile"><h3>USER</h3></div>
			</div>

		) : (

			<div>Mobile</div>

		)}
		</div>
	);
};

export default ExploreBar;
