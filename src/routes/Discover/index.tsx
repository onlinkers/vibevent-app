import React, { useEffect, useState } from "react";
import Map from "components/Map";
import { MapContext, MapProvider } from "context/MapContext";
import { apiFetch } from "utils";

import { Event } from "types/props";

const Discover: React.FunctionComponent = () => {

	const [events, setEvents] = useState<Event[]>([]);
	const [eventsLoaded, setEventsLoaded] = useState<boolean>(false);

	useEffect(() => {
		
		const fetchEvents = async () => {
			const events = await apiFetch("/events", {});
			setEvents(Object.values(events));
			setEventsLoaded(true);
		};

		fetchEvents();
	}, []);

	return (
		<MapProvider>
			<MapContext.Consumer>
				{({ loaded }) => (
					<div className="Discover Page">
						<Map
							loaded={loaded && eventsLoaded}
							events={events}
						/>
					</div>
				)}
			</MapContext.Consumer>
		</MapProvider>
	);
};

export default Discover;
