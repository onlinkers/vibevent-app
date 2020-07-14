import React, { useContext } from "react";
import moment from "moment";
import { motion } from "framer-motion";

import "./index.scss";
import { Event } from "types/props";
import { ThemeContext } from "context/ThemeContext";

interface Props {
  event: Event;
  onClick?: Function;
}

const SmallEventCard: React.FunctionComponent<Props> = (props) => {
  const { breakpoint } = useContext(ThemeContext);
  const { event, onClick = () => {} } = props;
  const month = moment(event?.startDate).format("MMM DD");
  return (
    <>
      <motion.div
        className="small-card"
        whileHover={breakpoint === "desktop" ? { scale: 1.1 } : {}}
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
            {/* {event?.name.slice(0, 35) + (event?.name.length > 35 ? "..." : "")} */}
            {event?.name}
          </p>
          <p className="description-host">UBC SISA</p>
        </div>
      </motion.div>
    </>
  );
};

export default SmallEventCard;
