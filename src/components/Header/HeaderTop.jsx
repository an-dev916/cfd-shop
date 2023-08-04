import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const HeaderTop = ({ onOpenModal, profile, onLogout }) => {
  const { firstName, lastName } = profile || {};
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0938166302">
            <i className="icon-phone" /> Hotline: 093 8166 302{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!profile ? (
            <ul className="top-menu top-link-menu">
              <li>
                <a
                  // href="#signin-modal"
                  // data-toggle="modal"
                  className="top-menu-login"
                  onClick={() => onOpenModal(true)}
                >
                  <i className="icon-user"></i>Login | Resgister{" "}
                </a>
              </li>
            </ul>
          ) : (
            <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  {firstName + " " + lastName}{" "}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.DASHBOARD.INDEX}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD.ORDERS}>Your Orders</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD.WISHLIST}>
                          Wishlist <span>(3)</span>
                        </Link>
                      </li>
                      <li>
                        <a onClick={onLogout}>Sign Out</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
