import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle } from "framer-motion";

import { AppContext } from "context/AppContext";

import HomeIcon from "components/svg/home-icon/HomeIcon";
import "./index.scss";

interface Props {}

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

const Navbar: React.FunctionComponent<Props> = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { session } = useContext(AppContext);
  const { isAuthenticated } = session;

  let links = [...routes];
  if (isAuthenticated) links = [...routes, ...authenticatedRoutes];

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <HomeIcon
          toggle={true}
        />
      </div>
    </div>
  );
}

export default Navbar;
