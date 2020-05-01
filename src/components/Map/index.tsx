import React from "react";
import Mapbox from "./mapbox";

import { Event } from "types/props";

interface Props {
	loaded: boolean
	events: Event[]
}

const Map: React.FunctionComponent<Props> = ({ loaded, events }) => {

	return (
		<React.Fragment>
			{!loaded && <div className="Page Loader">Loading...</div>}
			<Mapbox events={events}/>
		</React.Fragment>
	);
};

export default Map;