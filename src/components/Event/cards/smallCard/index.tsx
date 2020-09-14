import React from "react";
import moment from "moment";
import { motion } from "framer-motion";

import "./index.scss";
import { Event, User } from "types/props";

interface Props {
  event: Event;
  onClick?: Function;
}

// Used in quickaccesstool (desktop) and mobile view
const EventSmallCard: React.FunctionComponent<Props> = (props) => {
  const { event, onClick = () => {} } = props;
  const month = moment(event?.startDate).format("MMM DD");

  const hosts = (event.hosts as User[]).map((host) => `${host.firstName} ${host.lastName || ""}`);

  return (
    <motion.div
      className="event-small-card"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.001 }}
      onClick={() => onClick()}
    >
      <img
        className="event-coverphoto"
        src={event?.media?.coverPhoto?.baseSrc}
        alt="eventCoverPhoto"
      />
      <div className="event-description">
        <p className="description-date">{month}</p>
        <p className="description-title">
          {event?.name}
        </p>
        <p className="description-host">{hosts.join(", ")}</p>
      </div>
    </motion.div>
  );
};

export default EventSmallCard;
