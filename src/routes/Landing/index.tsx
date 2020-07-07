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
        <div className="landing-logo-section">
          <div className="landing-logo">
            <VibeventLogoBordered />
            <img
              src={VibeventNameLogo}
              className="vibevent-landing-name"
              alt=""
            />
          </div>
        </div>
        <div className="landing-description-section">
          <h1>OUR STORY</h1>
          <p className="our-story">
            At Vibevent, we believe in creating unique moments that leave a
            lasting impression. What differentiates us from our competitors is
            that we really listen to our clients, creating distinctive events
            tailored to their specific needs and desires. Our innovative mix of
            solutions ensures that every detail is covered. Get in touch to
            learn how we can make your dream event a reality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
