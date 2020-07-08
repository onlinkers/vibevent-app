import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import useDimensions from "react-use-dimensions";

import { AppContext } from "context/AppContext";

import MenuToggle from "components/svg/menu-toggle/MenuToggle";
import VibeventLogo from "components/svg/vibevent-logo/VibeventLogo";
// import VibeventNameLogo from "components/svg/vibevent-name-logo/VibeventNameLogo";
import "./index.scss";

interface Props {}

const wide = window.innerWidth >= 600;

const sidebarVariants = {
  open: () => ({
    width: wide ? "20%" : "100%",
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

const routes = [
  {
    label: "Dashboard",
    route: "/event/dashboard",
  },
  // {
  //   label: "Discover",
  //   route: "/discover",
  // },
];

const authenticatedRoutes = [

  {
    label: "Create",
    route: "/event/create",
  },
  {
    label: "My Activity",
    route: "/profile",
  },
];

const Navigation = ({ isOpen }) => {


  const { session } = useContext(AppContext);
  const { isAuthenticated } = session;

  let links = [...routes];
  if(isAuthenticated) links = [...routes, ...authenticatedRoutes];

  const [theme, toggleTheme] = useCycle(false, true);

  return (
    <>
      <motion.div
        variants={navVariants}
        className="vibevent-logo-container"
        initial={false}
      >
        {/* <VibeventNameLogo /> */}
        <VibeventLogo toggle={() => toggleTheme()} theme={theme} />
      </motion.div>
      <motion.ul className="navlinks">
        {links.map((item) => {
          return (
            <Link
              to={item.route}
              style={!isOpen ? { pointerEvents: "none" } : {}}
              key={item.label}
            >
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                variants={navVariants}
                className="navlink"
              >
                {item.label}
              </motion.li>
            </Link>
          );
        })}
      </motion.ul>
    </>
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
        onHoverEnd={isOpen ? () => toggleOpen() : undefined}
      >
        <Navigation isOpen={isOpen} />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};

export default Sidebar;
