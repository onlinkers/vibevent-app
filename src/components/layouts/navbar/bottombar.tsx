import React from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import "./index.scss";

interface Props {
  routes: any[];
}

const Navbar: React.FunctionComponent<Props> = ({ routes }) => {

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        {routes.map((route) => {
          return (
            <Link
              to={route.url}
              style={{ pointerEvents: "none" }}
              key={route.label}
            >
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                className="navlink"
              >
                <route.mobileIcon toggle={true}/>
              </motion.li>
            </Link>
          );
        })}
        
      </div>
    </div>
  );
};

export default Navbar;
