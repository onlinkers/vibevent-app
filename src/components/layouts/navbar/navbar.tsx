import React from "react";

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
        <HomeIcon
          toggle={true}
        />
      </div>
    </div>
  );
}

export default Navbar;
