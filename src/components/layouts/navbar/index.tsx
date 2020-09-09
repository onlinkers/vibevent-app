import React, { useContext } from "react";

import { ThemeContext } from "context/ThemeContext";
import { AppContext } from "context/AppContext";

import Sidebar from "./sidebar";
import Bottombar from "./bottombar";

import HomeIcon from "components/svg/home-icon/HomeIcon";

const routes = [
  {
    label: "Dashboard",
    url: "/event/dashboard",
    mobileIcon: HomeIcon
  },
  // {
  //   label: "Discover",
  //   url: "/discover",
  //   mobileIcon: () => {}
  // },
];
  
const authenticatedRoutes = [
  {
    label: "Create",
    url: "/event/create",
    mobileIcon: HomeIcon
  },
  {
    label: "My Activity",
    url: "/profile",
    mobileIcon: HomeIcon
  },
];

const Navbar = () => {

  const { breakpoint } = useContext(ThemeContext);
  const { session } = useContext(AppContext);
  const { isAuthenticated } = session;
  
  let filteredRoutes = [...routes];
  if (isAuthenticated) filteredRoutes = [...routes, ...authenticatedRoutes];

  return breakpoint === "mobile"
    ? <Bottombar routes={filteredRoutes} />
    : <Sidebar breakpoint={breakpoint} routes={filteredRoutes} />;
};

export default Navbar;
