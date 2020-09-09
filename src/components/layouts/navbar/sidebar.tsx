import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import useDimensions from "react-use-dimensions";

import MenuToggle from "components/svg/menu-toggle/MenuToggle";
import VibeventLogo from "components/svg/vibevent-logo/VibeventLogo";
import "./index.scss";

interface Props {
  breakpoint: String;
  routes: any[];
}

const Navigation = ({ isOpen, routes }) => {

  const navVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <>
      <Link to='/'>
        <motion.div
          variants={navVariants}
          className="vibevent-logo-container"
          initial={false}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.98 }}
        >
          <VibeventLogo/>
        </motion.div>
      </Link>
      <motion.ul className="navlinks">
        {routes.map((route) => {
          return (
            <Link
              to={route.url}
              style={!isOpen ? { pointerEvents: "none" } : {}}
              key={route.label}
            >
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                variants={navVariants}
                className="navlink"
              >
                {route.label}
              </motion.li>
            </Link>
          );
        })}
      </motion.ul>
    </>
  );
};

const Sidebar: React.FunctionComponent<Props> = ({ breakpoint, routes }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [containerRef, { height }] = useDimensions();

  const sidebarOpenWidth = useMemo(() => breakpoint === "tablet-portrait" ? "40%" : "20%", [breakpoint]);

  const sidebarVariants = {
    open: () => ({
      width: sidebarOpenWidth,
      transition: {
        type: "spring",
        stiffness: 300,
        restDelta: 2,
        damping: 100,
      },
    }),
    closed: () => ({
      width: "0",
      transition: {
        delay: 0,
        type: "spring",
        stiffness: 300,
        damping: 100,
      },
    }),
  };

  return (
    <>
      <motion.nav
        className="sidebar"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        variants={sidebarVariants}
        onHoverEnd={isOpen ? () => toggleOpen() : undefined}
      >
        <Navigation isOpen={isOpen} routes={routes}/>
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};

export default Sidebar;
