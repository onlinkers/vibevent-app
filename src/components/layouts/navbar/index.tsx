import React, { useContext } from "react";

import { ThemeContext } from "context/ThemeContext";
import { AppContext } from "context/AppContext";

import Sidebar from "./sidebar";
import Bottombar from "./bottombar";

// import BookIcon from "components/svg/book-icon";
import CreateIcon from "components/svg/create-icon";
// import HomeIcon from "components/svg/home-icon";
import SearchIcon from "components/svg/search-icon";

const routes = [
  {
    label: "Dashboard",
    url: "/event/dashboard",
    mobileIcon: SearchIcon
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
    mobileIcon: CreateIcon
  },
  // {
  //   label: "My Activity",
  //   url: "/profile",
  //   mobileIcon: BookIcon
  // },
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
