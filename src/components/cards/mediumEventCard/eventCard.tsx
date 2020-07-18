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

const MediumEventCard: React.FunctionComponent<Props> = (props) => {
  const { breakpoint } = useContext(ThemeContext);
  const { event, onClick = () => {} } = props;
  const month = moment(event?.startDate).format("MMM DD");
  return (
    <>
      <motion.div
        className="medium-card"
        whileHover={breakpoint === "desktop" ? { scale: 1.1 } : {}}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.001 }}
        onClick={() => onClick()}
      >
        <img
          className="medium-card-coverphoto"
          src={event?.media?.coverPhoto?.baseSrc}
          alt="eventCoverPhoto"
        />
        <div className="medium-card-description">
          <p className="description-date">{month}</p>
          <p className="description-title">
            {event?.name}
          </p>
          <p className="description-host">UBC SISA</p>
        </div>
      </motion.div>
    </>
  );
};

export default MediumEventCard;
