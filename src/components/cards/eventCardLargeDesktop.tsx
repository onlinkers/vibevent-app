import React, { useState } from "react";
import { Event } from "types/props";

interface Props {
  event: Event;
  favorited?: boolean;
  variant?: "detailed" | "brief";
  loading?: boolean;
  width?: string;
  size?: string;
  refetch?: Function;
  [key: string]: any;
}

const EventCardLD: React.FunctionComponent<Props> = (props) => {
  const { event } = props;
  const [isSaved, setIsSaved] = useState(false);

  return (
    <React.Fragment>
      <div className="event-card-ld">
        <div className="event-image">
          <img
            src={event.media?.coverPhoto?.baseSrc}
            alt=""
            className="event-image__img"
          />
        </div>
        <div className="event-description">
          <h3 className="event-date">
            <span className="month">June</span>
            <br />
            <span className="date">1</span>
          </h3>
          <div className="title-tags">
            <h3 className="event-title">{event.name}</h3>
            <p className="event-tags">Online • Cuisines • Creative</p>
          </div>
          <button
            className={"save-btn " + (isSaved ? "save-btn--active" : "")}
            onClick={(e) => {
              console.log(isSaved);
              setIsSaved(!isSaved);
            }}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventCardLD;
