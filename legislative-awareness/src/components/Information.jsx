import React from "react";
// import {Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";


function Information() {
  return (
    <div>
      <Navigation />
      <div className="thin">
        <h1 className="center-header">The New York State Government</h1>
        <div className="">
          <div className="split">
            <h2 className="textBlock">
              Transparency through Centralized Information
            </h2>
            <p className="textBlock medium small">
              Below you'll find basic information about how our government
              functions here in New York State. As complicated as it may be,
              learning about how representation works and what you can do to
              participate in our government is essential to preserving our
              democracy and the voice we all should have in our laws and
              governance.
            </p>
          </div>
          <div className="middle">
            <p className="centeredText">
              As a representative democracy, the U.S. is relatively transparent
              with its legislative decision-making but this data is massive and
              difficult to understand without a good amount of time for
              research. That is where we come in.
            </p>
          </div>
          <h2 className="middle">Elected Officers & Appointed Officials</h2>

          <p className="middle">
            Surprisingly, not many people living in New York know that their are
            only four statewide goverment officers who are directly elected:
          </p>
          <li>
            {" "}
            <span>
              {" "}
              The Governor, who heads the Executive Department, and Lieutenant
              Governor (who are elected on a joint ballot).{" "}
            </span>{" "}
          </li>
          <li>
            {" "}
            <span>
              {" "}
              The State Comptroller, who heads the Department of Audit and
              Control.{" "}
            </span>{" "}
          </li>
          <li>
            {" "}
            <span>
              {" "}
              The Attorney General, who heads the Department of Law.{" "}
            </span>{" "}
          </li>

          <h2 className="middle">More information to come.</h2>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Information;
