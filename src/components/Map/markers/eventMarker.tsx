import React from "react";

import { Event } from "types/props";
import DefaultImage from "assets/media/default-image.png";
import "./index.css";

interface Props {
	event: Event
	redirect: (id) => void
}

const EventMarker: React.FunctionComponent<Props> = ({ event, redirect }) => {

  const imageSrc = event.media?.coverPhoto?.url || DefaultImage;
  const imageName = event.name;
  const eventId = event._id;

  return (
    <div className="event-marker" onClick={() => {redirect(eventId);}}>
      <svg
        width="100%"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33 64.1508L34.8088 62.5714C50.0189 49.2902 57.75 37.6936 57.75 27.5C57.75 13.0643 46.4831 2.75 33 2.75C19.5169 2.75 8.25 13.0643 8.25 27.5C8.25 37.6936 15.9811 49.2902 31.1912 62.5714L33 64.1508Z"
          fill="white"
        />
      </svg>
      <img
        className="event-marker__image"
        src={imageSrc}
        alt={imageName}
        // TODO: Add link to event-page
      />
    </div>
  );
};

export default EventMarker;