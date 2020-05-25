import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Mapbox from "./mapbox";

import { Event } from "types/props";
import { filterEventsByCategoryKeys } from "utils";

interface Props {
	loaded: boolean
	events: { [key: string]: Event}
	selectedCategories: string[]
}

// The "Map" component will serve as a wrapper that handles higher-order view logic
// Speciffically, the component should handle loading logic, filters, and rendering
const Map = React.memo<Props>(({ loaded, events, selectedCategories }) => {

	const [filteredEvents, setFilteredEvents] = useState(Object.values(events));

	// Allow redirecting from componenets of the map
	const history = useHistory();

	const redirectToEvent = (eventId) => {
		history.push(`/event/${eventId}`); 
	};

	useEffect(() => {
		setFilteredEvents(filterEventsByCategoryKeys(Object.values(events), selectedCategories));
	}, [events, selectedCategories]); // eslint-disable-line
	// (disable line to overcome exhaustive depts in the previous line)
	
	return (
		<React.Fragment>
			{!loaded && <div className="Page Loader">Loading...</div>}
			<Mapbox
				events={filteredEvents}
				functions={{
					redirectToEvent
				}}
			/>
		</React.Fragment>
	);
});

export default Map;