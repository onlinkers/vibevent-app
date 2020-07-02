import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import useDimensions from "react-use-dimensions";

import "./sidebar.scss";
import MenuToggle from "components/svg/MenuToggle";

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
    x: 50,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 0,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const routes = [
  {
    label: "Dashboard",
    route: "/event/dashboard",
  },
  {
    label: "Discover",
    route: "/discover",
  },
];

const Navigation = ({ list, isOpen }) => {
  return (
    <motion.ul className="navlinks">
      {list.map((item) => {
        return (
          <>
            <Link
              to={item.route}
              style={!isOpen ? { pointerEvents: "none" } : {}}
            >
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                variants={navVariants}
                className="navlink"
                key={item.name}
              >
                {item.label}
              </motion.li>
            </Link>
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
        <Navigation list={routes} isOpen={isOpen} />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};

export default Sidebar;
