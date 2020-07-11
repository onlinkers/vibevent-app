import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import "./index.scss";

const VibeventLogoBordered = () => {
  const blackBox = useAnimation();
  const blackStroke1 = useAnimation();
  const blackStroke2 = useAnimation();

  return (
    <motion.svg
      width="220"
      height="219"
      className="vibevent-logo-bordered"
      viewBox="0 0 220 219"
      style={{ originX: "50%", originY: "50%" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M38.3205 109.033L110 37.3535L181.679 109.033L110 180.712L38.3205 109.033Z"
        fill="white"
        fillOpacity="0"
        stroke="black"
        strokeWidth="0.5"
        animate={blackStroke1}
        initial={{ rotate: 0 }}
        transition={{
          loop: Infinity,
          ease: "linear",
          duration: 2,
        }}
      />
      <motion.path
        d="M38.3205 109.033L110 37.3535L181.679 109.033L110 180.712L38.3205 109.033Z"
        fill="white"
        fillOpacity="0"
        stroke="black"
        strokeWidth="0.5"
        animate={blackStroke2}
        initial={{ rotate: 0, opacity: 0 }}
        transition={{
          loop: Infinity,
          ease: "linear",
          duration: 2,
        }}
      />
      <motion.path
        d="M110 56L163.033 109.033L110 162.066L56.967 109.033L110 56Z"
        fill="black"
        animate={blackBox}
        initial={{ fillOpacity: 0.8 }}
        onHoverStart={() => {
          blackBox.start({
            scale: 1.35,
            fillOpacity: 1,
          });
          blackStroke2.start({
            rotate: 360,
            opacity: 1,
          });
        }}
        onHoverEnd={() => {
          blackBox.start({
            scale: 1.0,
            fillOpacity: 0.8,
          });
          blackStroke2.set({
            rotate: 0,
            opacity: 0,
          });
          blackStroke2.stop();
        }}
        transition={{ ease: "backInOut" }}
      />

      <motion.path
        d="M106.163 122.859L110 96L113.837 122.859C113.923 123.461 113.456 124 112.847 124H107.153C106.544 124 106.077 123.461 106.163 122.859Z"
        fill="white"
        onHoverStart={() => {
          blackBox.start({
            scale: 1.35,
            fillOpacity: 1,
          });
          blackStroke2.start({
            rotate: 360,
            opacity: 1,
          });
        }}
        onHoverEnd={() => {
          blackBox.start({
            scale: 1.0,
            fillOpacity: 0.8,
          });
          blackStroke2.set({
            rotate: 0,
            opacity: 0,
          });
          blackStroke2.stop();
        }}
      />
      <motion.path
        d="M110 100L106.724 93.4472C106.391 92.7823 106.875 92 107.618 92L112.382 92C113.125 92 113.609 92.7823 113.276 93.4472L110 100Z"
        fill="white"
        onHoverStart={() => {
          blackBox.start({
            scale: 1.35,
            fillOpacity: 1,
          });
          blackStroke2.start({
            rotate: 360,
            opacity: 1,
          });
        }}
        onHoverEnd={() => {
          blackBox.start({
            scale: 1.0,
            fillOpacity: 0.8,
          });
          blackStroke2.set({
            rotate: 0,
            opacity: 0,
          });
          blackStroke2.stop();
        }}
      />
    </motion.svg>
  );
};

export default VibeventLogoBordered;
