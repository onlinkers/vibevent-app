import React, { useContext } from "react";
import moment from "moment";
import { motion } from "framer-motion";

import "./index.scss";
import { Event } from "types/props";
import { ThemeContext } from "context/ThemeContext";

import shareIcon from "../../../assets/icons/share.svg";
import bookmarkIcon from "../../../assets/icons/bookmark.svg";

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
          <div className="description-text">
            <p className="description-date">{month}</p>
            <p className="description-title">
              {event?.name}
            </p>
            <p className="description-host">UBC SISA</p>
          </div>
          <div className="description-options">
            <a className="share-button">
              <img src={shareIcon}/>
            </a>
            <a className="bookmark-button">
              <img src={bookmarkIcon}/>
            </a>
          </div>
        </div>

      </motion.div>
    </>
  );
};

export default MediumEventCard;
