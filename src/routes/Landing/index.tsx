import React, { useContext } from "react";
import { motion } from "framer-motion";

import "./index.scss";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "antd";
import LargeEventCard from "components/Event/cards/largeCard";

import VibeventLogo from "components/svg/vibevent-logo";
import VibeventNameLogo from "components/svg/vibevent-name-logo";
import MenuIcon from "assets/icons/menu-icon.svg";
import Hero3D from "assets/media/hero-3d.png";

import { ThemeContext } from "context/ThemeContext";
import sampleEvents from "./sample-events.json";

const LandingHeader = () => {
  const { breakpoint } = useContext(ThemeContext);

  const menuOptions = (
    <>
      {/* <Link to="/"><Button className="ant-btn-empty">pricing</Button></Link> */}
      {/* <Link to="/"><Button className="ant-btn-empty">about us</Button></Link> */}
      {/* <Link to="/"><Button className="ant-btn-empty">contact</Button></Link> */}
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
        <Dropdown overlay={menuOptions} placement="bottomCenter" className="navigation--mobile" overlayClassName="navigation--mobile__dropdown" trigger={["click"]}>
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

const StepNum = ({ direction = "ltr", num }) => {

  const { breakpoint } = useContext(ThemeContext);

  return (
    <div className="step-num" style={{ flexDirection: direction === "ltr" || breakpoint === "mobile" ? "row" : "row-reverse" }}>
      <svg width="531" height="2" viewBox="0 0 531 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1" x2="531" y2="1" stroke="#FF1D58" strokeWidth="2"/>
      </svg>
      <svg width="100" height="80" viewBox="0 0 126 126" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="63" cy="63" r="62" stroke="#FF1D58" strokeWidth="2"/>
        <text x="40" y="75" className="step-num__num">{num}</text>
      </svg>
    </div>
  );

};

const Landing = () => {
  return (
    <div className="Landing">
      <div className="hero">
        <LandingHeader />
        <img src={Hero3D} alt="hero" className="hero-3d"/>
        <div className="hero-text">
          <h1>A virtual space for all your event discovery needs.</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt sed integer gravida in ac faucibus lorem. Eros hendrerit nibh egestas tincidunt. Ullamcorper dolor mauris dui non nunc amet ultrices. In erat sagittis ipsum justo.</p>
          <Link to="/event/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.1 }}
            >
              <Button type="primary" className="explore-btn">Explore the Dashboard &gt;&gt;</Button>
            </motion.div>
          </Link>
        </div>
      </div>

      <div className="steps">

        <div className="step-text-container first">
          <div className="step-text-container-flex">
            <StepNum direction="ltr" num="01"/>
            <div className="step-text">
              <h1>Plan your event.</h1>
              <p>Our team will help you formulate the best strategy according to statistics on student trends and behaviors. Capture the attention of your target group!</p>
            </div>
          </div>
        </div>
        <div className="step-background s-1">
          <div className="step-background-img">
            <div className="textbox-white">Capturing Your Target Audience</div>
          </div>
        </div>

        <div className="step-text-container reverse">
          <div className="step-text-container-flex">
            <StepNum direction="rtl" num="02"/>
            <div className="step-text">
              <h1>Promote your event.</h1>
              <p>Easily reach up to 1000 students and obtain at least 100 registrants with us. We’ll be using our very own marketing channels to ensure your event gains the traction it needs!</p>
            </div>
          </div>
        </div>
        <div className="step-background s-2">
          {sampleEvents.map((event) => <LargeEventCard key={event._id} event={(event as any)}/>)}
        </div>


        <div className="step-text-container full">
          <div className="step-text-container-flex">
            <StepNum direction="ltr" num="03"/>
            <div className="step-text">
              <h1>Host your event.</h1>
              <p>Struggling to find the best platform to fulfill your purpose? We offer Zoom, Google Meet, Hopin, and Run The World at a fraction of the cost! Your amazing event doesn’t have to break the bank.</p>
            </div>
          </div>
        </div>
        <div className="step-background s-3"></div>

        <div className="step-text-container reverse last">
          <div className="step-text-container-flex">
            <StepNum direction="rtl" num="04"/>
            <div className="step-text">
              <h1>Manage your event.</h1>
              <p>We want you and your attendees to have the best possible time during your event. From preventing technical issue headaches to making sure the event flows well, we want all of you to have a magical experience!</p>
            </div>
          </div>
        </div>
        <div className="step-background s-4">
          <div className="step-background-img"></div>
        </div>

      </div>

    </div>
  );
};

export default Landing;
