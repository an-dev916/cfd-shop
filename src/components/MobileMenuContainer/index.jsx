import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import { useAuthen } from "../MainContext";
import MenuCates from "./MenuCates";
import MenuMain from "./MenuMain";
import MenuSocials from "./MenuSocials";
import useMobileMenu from "./useMobileMenu";

const MobileMenuContainer = () => {
  const { onHideMenu } = useAuthen();
  const { menuCatesProps } = useMobileMenu();
  const menuList = document.querySelector(".mobile-menu");
  if (menuList) {
    const menuItem = menuList.querySelectorAll("li");
    menuItem.forEach((item) =>
      item.addEventListener("click", (e) => {
        console.log("testclick");
        onHideMenu();
        document.body.scrollIntoView({ behavior: "smooth", block: "start" });
        e.preventDefaul();
      })
    );
  }

  return (
    <div className="mobile-menu-container">
      <div className="mobile-menu-wrapper">
        <span className="mobile-menu-close" onClick={onHideMenu}>
          <i className="icon-close" />
        </span>
        {/* <form action="#" method="get" className="mobile-search">
          <label htmlFor="mobile-search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            className="form-control"
            name="mobile-search"
            id="mobile-search"
            placeholder="Search in..."
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search" />
          </button>
        </form> */}
        <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="mobile-menu-link"
              data-toggle="tab"
              href="#mobile-menu-tab"
              role="tab"
              aria-controls="mobile-menu-tab"
              aria-selected="true"
            >
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="mobile-cats-link"
              data-toggle="tab"
              href="#mobile-cats-tab"
              role="tab"
              aria-controls="mobile-cats-tab"
              aria-selected="false"
            >
              Categories
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <MenuMain />
          <MenuCates {...menuCatesProps} />
        </div>
        <MenuSocials />
      </div>
      {/* End .mobile-menu-wrapper */}
    </div>
  );
};

export default MobileMenuContainer;
