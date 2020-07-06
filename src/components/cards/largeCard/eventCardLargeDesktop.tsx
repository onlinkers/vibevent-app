import React, { useState } from "react";
import { Event } from "types/props";
import { motion } from "framer-motion";
import moment from "moment";

import "./index.scss";
import { User } from "types/props";

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
  const month = moment(event.startDate).format("MMM").toUpperCase();
  const date = moment(event.startDate).format("DD");

  const hosts = event.hosts && event.hosts.length ? (event.hosts as User[]).map((host) => {
    return `${host.firstName} ${host.lastName}`;
  }) : [];

  return (
    <React.Fragment>
      <motion.div className="event-card-ld">
        <div className="event-image">
          <img
            src={
              event.media?.coverPhoto?.baseSrc
                ? event.media?.coverPhoto?.baseSrc
                : "assets/media/default-image.png"
            }
            alt=""
            className="event-image__img"
          />
        </div>
        <div className="event-description">
          <h3 className="event-date">
            <span className="month">{month}</span>
            <br />
            <span className="date">{date}</span>
          </h3>
          <div className="event-title-hosts">
            <p className="event-title">
              {event?.name.slice(0, 37) +
                (event?.name.length > 37 ? "..." : "")}
            </p>
            <p className="event-host">
              {hosts.join(", ")}
            </p>
          </div>
          <button
            className={"save-btn " + (isSaved ? "save-btn--active" : "")}
            onClick={(e) => {
              setIsSaved(!isSaved);
            }}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default EventCardLD;
