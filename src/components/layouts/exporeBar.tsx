import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ExploreButton } from "assets/icons/explore.svg";

import "./index.css";

const EXPLORE_STATES = {
	DASHBOARD: "/event/dashboard",
	DISCOVER: "/discover",
	MOMENTS: "/moments",
	CREATE: "/event/create",
};

interface Props {
    
}

const ExploreBar: React.FunctionComponent<Props> = () => {

	const { innerWidth } = window;

	// Should also detect which "page it is currently on"
	const { pathname } = useLocation();

	return (innerWidth >= 800 ? (

		<div className="desktop-explore">
			<Link to="/"><h3 className="explore-title" color="blue">ONLINKER</h3></Link>
			<div className="explore-links">
				<Link to="/event/dashboard">
					<div className="explore-link">
						<h4 className="explore-link-text">Dashboard</h4>
						{pathname.includes(EXPLORE_STATES.DASHBOARD) && <div className="explore-link-line"/>}
					</div>
				</Link>
				<Link to="/discover">
					<div className="explore-link">
						<h4 className="explore-link-text">Discover</h4>
						{pathname.includes(EXPLORE_STATES.DISCOVER) && <div className="explore-link-line"/>}
					</div>
				</Link>
				<Link to="#">
					<div className="explore-link">
						<h4 className="explore-link-text">Moments</h4>
						{pathname.includes(EXPLORE_STATES.MOMENTS) && <div className="explore-link-line"/>}
					</div>
				</Link>
				<Link to="/event/create">
					<div className="explore-link">
						<h4 className="explore-link-text">Create</h4>
						{pathname.includes(EXPLORE_STATES.CREATE) && <div className="explore-link-line"/>}
					</div>
				</Link>
			</div>
			<div className="explore-profile"><h4>USER</h4></div>
		</div>

	) : ( // TODO: Icons and stuff

		<div className="mobile-explore">
			<div className="explore-links explore-links---mobile">
				<Link to="/event/dashboard">
					<h4 className="explore-link">D</h4>
				</Link>
				<Link to="/discover">
					<h4 className="explore-link">D</h4>
				</Link>
				<div className="explore-mobile-spacer" />
				<Link to="#">
					<h4 className="explore-link">M</h4>
				</Link>
				<Link to="#">
					<h4 className="explore-link">C</h4>
				</Link>
			</div>
			<div className="explore-mobile-button"><ExploreButton /></div>
		</div>

	));
};

export default ExploreBar;
