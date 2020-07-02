import React, { useRef } from "react";
import "./sidebar.scss";
import MenuToggle from "components/svg/MenuToggle";

import { motion, useCycle } from "framer-motion";
import useDimensions from "react-use-dimensions";
import { NONAME } from "dns";

interface Props {}

const sidebarVariants = {
  open: (height = 1000) => ({
    width: "15%",
    transition: {
      type: "spring",
      stiffness: 300,
      restDelta: 2,
      damping: 100,
    },
  }),
  closed: () => ({
    width: "5%",
    transition: {
      delay: 0,
      type: "spring",
      stiffness: 300,
      damping: 100,
    },
  }),
};

const navVariants = {
  open: {
    "pointer-events": "auto",
    x: 50,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    "pointer-events": "none",
    x: 0,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const links = ["Dashboard", "Discover"];

const Navigation = ({ list }) => {
  return (
    <motion.ul className="navlinks">
      {list.map((item) => {
        return (
          <>
            <motion.li variants={navVariants} className="navlink">
              {item}
            </motion.li>
          </>
        );
      })}
    </motion.ul>
  );
};

const Sidebar: React.FunctionComponent<Props> = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [containerRef, { height }] = useDimensions();

  return (
    <>
      <motion.nav
        className="sidebar"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        variants={sidebarVariants}
      >
        <Navigation list={links} />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};

export default Sidebar;
