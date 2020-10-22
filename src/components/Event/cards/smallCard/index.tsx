import React from "react";
import momentz from "moment-timezone";
import { motion } from "framer-motion";

import Image from "components/shared/image";

import "./index.scss";
import { Event, User } from "types/props";

interface Props {
  event: Event;
  onClick?: Function;
}

// Used in quickaccesstool (desktop) and mobile view
const EventSmallCard: React.FunctionComponent<Props> = (props) => {
  const { event, onClick = () => {} } = props;
  const month = momentz(event?.startDate).format("MMM DD");

  const hosts = (event.hosts as User[]).map((host) => `${host.firstName} ${host.lastName || ""}`);

  return (
    <motion.div
      className="event-small-card"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.001 }}
      onClick={() => onClick()}
    >
      <Image
        collection="events"
        src={event?.media?.coverPhoto?.url}
        alt="eventCoverPhoto"
        className="event-coverphoto"
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
