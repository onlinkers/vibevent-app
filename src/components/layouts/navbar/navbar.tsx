import React from "react";

import { motion } from "framer-motion";
import HomeIcon from "components/svg/home-icon/HomeIcon";
import "./index.scss";

interface Props {}

// const routes = [
//   {
//     label: "Dashboard",
//     route: "/event/dashboard",
//   },
//   // {
//   //   label: "Discover",
//   //   route: "/discover",
//   // },
// ];

// const authenticatedRoutes = [
//   {
//     label: "Create",
//     route: "/event/create",
//   },
//   {
//     label: "My Activity",
//     route: "/profile",
//   },
// ];

const Navbar: React.FunctionComponent<Props> = () => {

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <motion.li
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.98 }}
          className="navlink"
        >
          <HomeIcon
            toggle={true}
          />
        </motion.li>
      </div>
    </div>
  );
}

export default Navbar;
