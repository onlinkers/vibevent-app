import React from "react";
import moment from "moment";
import { motion } from "framer-motion";

import "./index.scss";
import { Event } from "types/props";

interface Props {
  event: Event;
  onClick?: Function;
}

const EventCard: React.FunctionComponent<Props> = (props) => {
  const { event, onClick = () => {} } = props;
  const month = moment(event?.startDate).format("MMM DD");
  return (
    <>
      <motion.div
        className="small-card"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.001 }}
        onClick={() => onClick()}
      >
        <img
          className="small-card-coverphoto"
          src={event?.media?.coverPhoto?.baseSrc}
          alt="eventCoverPhoto"
        />
        <div className="small-card-description">
          <p className="description-date">{month}</p>
          <p className="description-title">
            {event?.name.slice(0, 35) + (event?.name.length > 35 ? "..." : "")}
          </p>
          <p className="description-host">UBC SISA</p>
        </div>
      </motion.div>
    </>
  );
};

export default EventCard;
