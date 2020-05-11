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
};

interface Props {
    
}

const ExploreBar: React.FunctionComponent<Props> = () => {

    const { innerWidth } = window;

    // Should also detect which "page it is currently on"
    const { pathname } = useLocation();

    return (innerWidth >= 800 ? (

        <div className="desktop-explore">
            <Link to="/"><h3 className="explore-title" color="blue">ONLINKER</h3></Link>
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
            <div className="explore-profile"><UserOutlined style={{ color: "##2351e0" }}/></div>
        </div>

    ) : ( // TODO: Icons and stuff

        <div className="mobile-explore">
            <div className="explore-links explore-links---mobile">
                <Link to="/event/dashboard">
                    <p className="explore-link"><HomeOutlined style={{ fontSize: "1.5em", color: "##2351e0" }}/></p>
                </Link>
                <Link to="/discover">
                    <p className="explore-link"><GlobalOutlined style={{ fontSize: "1.5em", color: "##2351e0" }}/></p>
                </Link>
                <div className="explore-mobile-spacer" />
                <Link to="#">
                    <p className="explore-link"><BulbOutlined style={{ fontSize: "1.5em", color: "##2351e0" }}/></p>
                </Link>
                <Link to="#">
                    <p className="explore-link"><UserOutlined style={{ fontSize: "1.5em", color: "##2351e0" }}/></p>
                </Link>
            </div>
            <div className="explore-mobile-button"><ExploreButton /></div>
        </div>

    ));
};

export default ExploreBar;
