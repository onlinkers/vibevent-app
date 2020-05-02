import React from "react";
import { useHistory } from "react-router-dom";

import Mapbox from "./mapbox";

import { Event } from "types/props";

interface Props {
	loaded: boolean
	events: Event[]
}

// The "Map" component will serve as a wrapper that handles higher-order view logic
// Speciffically, the component should handle loading logic and rendering
const Map = React.memo<Props>(({ loaded, events }) => {

	// Allow redirecting from componenets of the map
	const history = useHistory();

	const redirectToEvent = (eventId) => {
		history.push(`/event/${eventId}`); 
	};

	return (
		<React.Fragment>
			{!loaded && <div className="Page Loader">Loading...</div>}
			<Mapbox
				events={events}
				functions={{
					redirectToEvent
				}}
			/>
		</React.Fragment>
	);
});

export default Map;