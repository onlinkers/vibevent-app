import React, { useMemo, useContext } from "react";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { motion, useCycle } from "framer-motion";
import useDimensions from "react-use-dimensions";

import { AppContext } from "context/AppContext";
import { clearUserData } from "store/actions/userActions";
import popup from "popup";

import MenuToggle from "components/svg/menu-toggle";
import VibeventLogo from "components/svg/vibevent-logo";
import "./index.scss";

interface Props {
  breakpoint: String;
  routes: any[];
  clearUserData: Function;
}

const Navigation = (props) => {

  const {
    isOpen,
    routes,
    isAuthenticated,
    logIn,
    logOut
  } = props;

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
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.98 }}
          variants={navVariants}
          className="navlink logout"
          onClick={isAuthenticated ? logOut : logIn}
        >
          {isAuthenticated ? "Log Out" : "Log In"}
        </motion.div>
      </motion.ul>
    </>
  );
};

const Sidebar: React.FunctionComponent<Props> = ({ breakpoint, routes }) => {
  const history = useHistory();
  const { session } = useContext(AppContext);
  const { isAuthenticated, setIsAuthenticated } = session;

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

  const logIn = () => {
    history.push("/auth/login");
  };

  const logOut = async () => {
    // clear the tokens in local storage
    localStorage.clear();
    // set app context
    setIsAuthenticated(false);
    // clear redux from user
    clearUserData();
    // finally, sign out
    await Auth.signOut();
    // success message
    popup.success("Successfully logged out!");
    // refresh the page after
    history.go(0);
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
        <Navigation 
          isOpen={isOpen}
          routes={routes}
          isAuthenticated={isAuthenticated}
          logIn={logIn}
          logOut={logOut}
        />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserData: () => dispatch(clearUserData())
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);

