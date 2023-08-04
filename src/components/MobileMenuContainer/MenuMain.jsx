import React from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const MenuMain = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="mobile-menu-tab"
      role="tabpanel"
      aria-labelledby="mobile-menu-link"
    >
      <nav className="mobile-nav">
        <ul className="mobile-menu">
          <li>
            <NavLink end to={PATHS.HOME}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={PATHS.ABOUT}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.PRODUCT}>Product</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.BLOG}>Blog</NavLink>
          </li>
          <li>
            <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
          </li>
        </ul>
      </nav>
      {/* End .mobile-nav */}
    </div>
  );
};

export default MenuMain;
