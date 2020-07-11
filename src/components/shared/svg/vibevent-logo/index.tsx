import * as React from "react";
import { motion } from "framer-motion";
import "./index.scss";

const VibeventLogo = ({ toggle, theme }) => (
  <motion.svg
    width="109"
    height="109"
    viewBox="0 0 109 109"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="vibevent-logo"
    whileHover={{ scale: 1.1 }}
    onClick={toggle}
    style={{ originX: "50%", originY: "50%" }}
    variants={{
      prof: { rotate: 180 },
      soc: { rotate: 0 },
    }}
    animate={theme ? "prof" : "soc"}
  >
    <rect
      width="77"
      height="77"
      transform="translate(54.5 0.0527344) rotate(45)"
      fill="black"
    />
    <path
      d="M49.956 69.3586L53.793 42.5L57.6299 69.3586C57.716 69.961 57.2485 70.5 56.64 70.5H50.946C50.3374 70.5 49.87 69.961 49.956 69.3586Z"
      fill="white"
    />
    <path
      d="M53.793 46.5L50.5166 39.9472C50.1841 39.2823 50.6676 38.5 51.411 38.5H56.1749C56.9183 38.5 57.4018 39.2823 57.0694 39.9472L53.793 46.5Z"
      fill="white"
    />
  </motion.svg>
);

export default VibeventLogo;
