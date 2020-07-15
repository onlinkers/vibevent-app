import React from "react";
import { Event } from "types/props";
import { motion } from "framer-motion";
import moment from "moment";

import "./index.scss";
import { User } from "types/props";

interface Props {
  event: Event;
  saved?: boolean;
  loading?: boolean;
  onClick?: Function;
  onSaveClick?: Function;
  [key: string]: any;
}

const EventCard: React.FunctionComponent<Props> = (props) => {

  const { saved = null, event, onClick = () => {}, onSaveClick = () => {} } = props;

  const month = moment(event.startDate).format("MMM").toUpperCase();
  const date = moment(event.startDate).format("DD");

  const hosts = event.hosts && event.hosts.length ? (event.hosts as User[]).map((host) => {
    return `${host.firstName} ${host.lastName || ""}`;
  }) : [];

  const link = (e) => {
    
    // dont launch event if the button was clicked
    if((e.target as any).className.includes("btn")) return;
    onClick();

  };

  return (
    <React.Fragment>
      <motion.div
        className="event-card-ld"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.1 }}
        onClick={link}
      >
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
              {hosts.join(", ").slice(0, 20) +
                (hosts.join(", ").length > 20 ? "..." : "")}
            </p>
          </div>

          {saved !== null && (
            <button
              className={saved ? "save-btn--active" : "save-btn"}
              onClick={() => { onSaveClick(event._id, !saved); }}
            >
              {saved ? "Saved" : "Save"}
            </button>
          )}
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default EventCard;
