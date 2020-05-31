import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ExploreButton } from "assets/icons/explore.svg";

import {
  HomeOutlined,
  GlobalOutlined,
  BulbOutlined,
  UserOutlined
} from "@ant-design/icons";

import "./index.css";

const EXPLORE_STATES = {
  DASHBOARD: "/event/dashboard",
  DISCOVER: "/discover",
  MOMENTS: "/moments",
  CREATE: "/event/create",
  PROFILE: "/profile"
};

interface Props {
    
}

const iconStyle = { fontSize: "1.5em", color: "#2351e0" };

const ExploreBar: React.FunctionComponent<Props> = () => {

  const { innerWidth } = window;

  // Should also detect which "page it is currently on"
  const { pathname } = useLocation();

  return (innerWidth >= 800 ? (

    <div className="desktop-explore">
      <Link to="/"><h2 className="explore-title" color="blue">ONLINKER</h2></Link>
      <div className="explore-links">
        <Link to="/event/dashboard">
          <div className="explore-link">
            <p className={`explore-link-text ${pathname.includes(EXPLORE_STATES.DASHBOARD) && "active"}`}>Dashboard</p>
            {pathname.includes(EXPLORE_STATES.DASHBOARD) && <div className="explore-link-line"/>}
          </div>
        </Link>
        <Link to="/discover">
          <div className="explore-link">
            <p className={`explore-link-text ${pathname.includes(EXPLORE_STATES.DISCOVER) && "active"}`}>Discover</p>
            {pathname.includes(EXPLORE_STATES.DISCOVER) && <div className="explore-link-line"/>}
          </div>
        </Link>
        <Link to="#">
          <div className="explore-link">
            <p className={`explore-link-text ${pathname.includes(EXPLORE_STATES.MOMENTS) && "active"}`}>Moments</p>
            {pathname.includes(EXPLORE_STATES.MOMENTS) && <div className="explore-link-line"/>}
          </div>
        </Link>
        <Link to="/event/create">
          <div className="explore-link">
            <p className={`explore-link-text ${pathname.includes(EXPLORE_STATES.CREATE) && "active"}`}>Create</p>
            {pathname.includes(EXPLORE_STATES.CREATE) && <div className="explore-link-line"/>}
          </div>
        </Link>
      </div>
      {/* TODO: Import color from styles */}


      <Link to="/profile"><div className="explore-profile">
        <UserOutlined style={pathname.includes(EXPLORE_STATES.PROFILE) ? { color: "#2351e0" } : { color: "#000" }}/>
      </div></Link>
    </div>

  ) : ( // TODO: Icons and stuff

    <div className="mobile-explore">
      <div className="explore-links explore-links---mobile">
        <Link to="/event/dashboard">
          <p className="explore-link"><HomeOutlined style={iconStyle}/></p>
        </Link>
        <Link to="/discover">
          <p className="explore-link"><GlobalOutlined style={iconStyle}/></p>
        </Link>
        <div className="explore-mobile-spacer" />
        <Link to="#">
          <p className="explore-link"><BulbOutlined style={iconStyle}/></p>
        </Link>
        <Link to="/profile">
          <p className="explore-link"><UserOutlined style={iconStyle}/></p>
        </Link>
      </div>
      <div className="explore-mobile-button"><ExploreButton /></div>
    </div>

  ));
};

export default ExploreBar;
