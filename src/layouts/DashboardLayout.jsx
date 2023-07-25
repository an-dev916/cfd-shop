import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { PATHS } from "../constants/pathnames";
import useDashboard from "../pages/dashboard/useDashboard";

const DashboardLayout = () => {
  const { profileInfo, onUpdate, onLogout } = useDashboard();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Account
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <ul
                  className="nav nav-dashboard flex-column mb-3 mb-md-0"
                  role="tablist"
                >
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="tab-account-link"
                      data-toggle="tab"
                      end
                      to={PATHS.DASHBOARD.INDEX}
                      role="tab"
                      aria-controls="tab-account"
                      aria-selected="false"
                    >
                      Account Details
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="tab-orders-link"
                      data-toggle="tab"
                      to={PATHS.DASHBOARD.ORDERS}
                      role="tab"
                      aria-controls="tab-orders"
                      aria-selected="false"
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="tab-address-link"
                      data-toggle="tab"
                      to={PATHS.DASHBOARD.ADDRESSES}
                      role="tab"
                      aria-controls="tab-address"
                      aria-selected="false"
                    >
                      Adresses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="tab-wishlist-link"
                      data-toggle="tab"
                      to={PATHS.DASHBOARD.WISHLIST}
                      role="tab"
                      aria-controls="tab-wishlist"
                      aria-selected="false"
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={onLogout}>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </aside>
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  {/* Outlet */}
                  <Outlet profileInfo={profileInfo} onUpdate={onUpdate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
