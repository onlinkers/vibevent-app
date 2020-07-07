import React from "react";
import { motion, useCycle } from "framer-motion";

import "./index.scss";
import Backdrop from "assets/media/landing-page-backdrop.jpg";
import VibeventNameLogo from "assets/icons/vibevent-name-logo.svg";
import VibeventLogoBordered from "components/svg/vibevent-logo-bordered/VibeventLogoBordered";
import { Link } from "react-router-dom";

const Landing = () => {
  // const [isOpen, toggleOpen] = useCycle(false, true);
  // const textVariants = {
  //   open: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       y: { stiffness: 1000, velocity: -100 },
  //     },
  //   },
  //   closed: {
  //     y: -50,
  //     opacity: 0,
  //     transition: {
  //       y: { stiffness: 1000 },
  //     },
  //   },
  // };

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
          <motion.div className="our-story">
            {/* <motion.img
              src={
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              }
              alt=""
              className="our-story__img"
            /> */}
            <motion.p>
              At Vibevent, we believe in creating unique moments that leave a
              lasting impression. What differentiates us from our competitors is
              that we really listen to our clients, creating distinctive events
              tailored to their specific needs and desires. Our innovative mix
              of solutions ensures that every detail is covered. Get in touch to
              learn how we can make your dream event a reality.
            </motion.p>
          </motion.div>
          <div className="what-we-offer">
            <div className="offer-box event-hosting">
              <img
                src={
                  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80"
                }
                className="offer-box__img"
                alt=""
              />
              <h3>Event Hosting</h3>
              <p>
                Is organizing a platform for hosting events a hassle? We got you
                there! We aim to provide a virtual event space with multiple
                breakout rooms for you and your audience.
              </p>
            </div>
            <div className="offer-box event-discovery">
              <img
                src={
                  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                }
                alt=""
                className="offer-box__img"
              />
              <h3>Event Discovery</h3>
              <p>
                Searching for events is no longer a tedious effort. We aim to
                provide you with a platform where you can discover events
                without wasting time going through individual pages and register
                for them with ease.
              </p>
            </div>
            <div className="offer-box event-consulting">
              <img
                src={
                  "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1358&q=80"
                }
                alt=""
                className="offer-box__img"
              />
              <h3>Event Consulting</h3>
              <p>
                The key to creating a successful event is to have someone there
                who you can assist you from ideation to execution. Whether
                you’re starting with a vague idea or fleshed-out concept, we can
                help bring your vision to life.
              </p>
            </div>
          </div>
        </div>

        <div className="landing-footer">
          <div className="coming-soon">
            <h1>COMING SOON</h1>
            <h3>with new features!</h3>
            {/* <h5>We're still in the testing phase!</h5> */}
            <button className="dashboard-button">
              <Link to="/event/dashboard" className="dashboard-button__link">
                View Dashboard
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
