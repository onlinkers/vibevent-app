import * as React from "react";
import { motion } from "framer-motion";
import "./index.scss";

const VibeventNameLogo = ({ color = "black" }) => (
  <motion.h1
    className="vibevent-name-logo"
    style={{ color: color }}
  >
    vibevent.
  </motion.h1>
);

export default VibeventNameLogo;
