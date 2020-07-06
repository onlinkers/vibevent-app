import React from "react";

import "./index.scss";
import Backdrop from "assets/media/landing-page-backdrop.jpg";
import VibeventIcon from "components/svg/vibevent-logo-bordered/VibeventLogoBordered";
import VibeventNameLogo from "assets/icons/vibevent-name-logo.svg";
import VibeventLogoBordered from "components/svg/vibevent-logo-bordered/VibeventLogoBordered";

const Landing = () => {
  return (
    <div className="Landing">
      <img src={Backdrop} className="backdrop" alt="" />
      <div className="landing-content">
        <div className="landing-logo">
          <VibeventLogoBordered />
          <img
            src={VibeventNameLogo}
            className="vibevent-landing-name"
            alt=""
          />
        </div>
        <div className="landing-description"></div>
      </div>
    </div>
  );
};

export default Landing;
