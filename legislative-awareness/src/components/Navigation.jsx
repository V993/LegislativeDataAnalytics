import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand link" to="/">
            <h3>Legislative Awareness</h3>
          </Link>

          {/* Code taken from technomoro*/}
          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/local-info">
                  Local
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/data" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/data">
                  Data
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/information" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/information">
                  Information
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
