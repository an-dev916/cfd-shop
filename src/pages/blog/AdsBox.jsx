import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const AdsBox = () => {
  return (
    <div className="widget widget-banner-sidebar">
      <div className="banner-sidebar-title">ad box 280 x 280</div>
      <div className="banner-sidebar banner-overlay">
        <Link to={PATHS.PRODUCT}>
          <img src="/assets/images/blog/sidebar/banner.jpg" alt="banner" />
        </Link>
      </div>
    </div>
  );
};

export default AdsBox;
