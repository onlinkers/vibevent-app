import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExploreButton } from "assets/icons/explore.svg";

import "./index.css";

interface Props {
    
}

const ExploreBar: React.FunctionComponent<Props> = () => {

	const { innerWidth } = window;

	return (innerWidth >= 800 ? (

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

	) : ( // TODO: Icons and stuff

		<div className="mobile-explore">
			<div className="explore-links explore-links---mobile">
				<Link to="/event/dashboard">
					<h3 className="explore-link">D</h3>
				</Link>
				<Link to="/discover">
					<h3 className="explore-link">D</h3>
				</Link>
				<div className="explore-mobile-spacer" />
				<Link to="#">
					<h3 className="explore-link">M</h3>
				</Link>
				<Link to="#">
					<h3 className="explore-link">C</h3>
				</Link>
			</div>
			<div className="explore-mobile-button"><ExploreButton /></div>
		</div>

	));
};

export default ExploreBar;
