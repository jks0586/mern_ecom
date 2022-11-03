import React from "react";
import { Link } from "react-router-dom";
class adminLeft extends React.Component {
  render() {
    return (
      <div className="left-side-menu">
        <div className="slimscroll-menu">
          <div className="logo-box">
            <a href="index.html" className="logo">
              <span className="logo-lg">
                <img src="/assets/images/logo-light.png" alt="" height="22" />
              </span>
              <span className="logo-sm">
                <img src="/assets/images/logo-sm.png" alt="" height="24" />
              </span>
            </a>
          </div>

          <div className="user-box">
            <img
              src="/assets/images/users/avatar-1.jpg"
              alt="user-img"
              title="Mat Helme"
              className="rounded-circle img-thumbnail avatar-md"
            />
            <div className="dropdown">
              <a
                href="apps-contacts.html#"
                className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block"
                data-toggle="dropdown"
              >
                Jitendra Sharma
              </a>
            </div>
            <p className="text-muted">Admin Head</p>
          </div>

          <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
              <li>
              <Link to="/admin/dashboard">
                  <i className="fe-airplay"></i>
                  <span className="badge badge-danger float-right">3</span>
                  <span> Dashboard </span>
                </Link>
              </li>
              <li>
                <Link to="/admin/category">
                  <i className="fe-layers"></i> Category
                </Link>
              </li>
              <li>
                <Link to="/admin/product">
                  <i className="fe-layers"></i> Products
                </Link>
              </li>
              <li>
                <Link to="/admin/users">
                  <i className="fe-users"></i> Users
                </Link>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default adminLeft;
