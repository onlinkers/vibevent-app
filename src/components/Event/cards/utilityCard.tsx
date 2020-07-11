import React from "react";
import { motion } from "framer-motion";

import "./index.scss";
import CalendarIcon from "assets/icons/calendar.svg";

interface Props {}

const UtilityCard: React.FunctionComponent<Props> = () => {
  return (
    <motion.div
      className="utility-card"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.001 }}
    >
      <h3 className="qa-card__title">Search by Date</h3>
      <div className="qa-card__icon">
        <img src={CalendarIcon} alt="" />
      </div>
    </motion.div>
  );
};

export default UtilityCard;
