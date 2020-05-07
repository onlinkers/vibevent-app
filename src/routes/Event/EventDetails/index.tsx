import React from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {

	const { eventId } = useParams();

	// TODO: Get information about the single event

	return (
		<div>
            Event Details for event: {eventId}
		</div>
	);
};

export default EventDetails;
