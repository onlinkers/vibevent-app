import React, { useContext } from "react";
import { motion } from "framer-motion";

import "./index.scss";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "antd";

import VibeventLogo from "components/svg/vibevent-logo";
import VibeventNameLogo from "components/svg/vibevent-name-logo";
import MenuIcon from "assets/icons/menu-icon.svg";

import { ThemeContext } from "context/ThemeContext";

const LandingHeader = () => {
  const { breakpoint } = useContext(ThemeContext);

  const menuOptions = (
    <>
      <Link to="/"><Button className="ant-btn-empty">pricing</Button></Link>
      <Link to="/"><Button className="ant-btn-empty">about us</Button></Link>
      <Link to="/"><Button className="ant-btn-empty">contact</Button></Link>
      <Link to="/auth/login"><Button danger>login</Button></Link>
    </>
  );

  return (
    <div className="header">
      <motion.div className="logo">
        <VibeventLogo color="white"/>
        <VibeventNameLogo color="white"/>
      </motion.div>
      {breakpoint === "mobile" ? (
        <Dropdown overlay={menuOptions} placement="bottomCenter" className="navigation--mobile" overlayClassName="navigation--mobile__dropdown">
          <img src={MenuIcon} alt="menu"/>
        </Dropdown>
      ): (
        <motion.div className="navigation">
          {menuOptions}
        </motion.div>
      )}
    </div>
  );
};

const Landing = () => {
  return (
    <div className="Landing">
      <div className="hero">
        <LandingHeader />
      </div>
    </div>
  );
};

export default Landing;
