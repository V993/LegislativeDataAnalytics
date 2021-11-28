import React from "react";
// import "./style.css";
import { Link } from 'react-router-dom';

import Header from "./Header";

function Home() {
  return (
    <div className="">
      <Header />
      <div className="grid">
        <div className="cell normal data">
          <Link to="/data" className="link">
            <h1 className="white">Data</h1>
          </Link>
        </div>
        <div className="cell beegboi local">
          <Link to="/local-info" className="link">
            <h1 className="black">Local Representation</h1>
          </Link>
        </div>
      </div>
      <div className="grid">
        <div className="cell beegboi information">
          <Link to="/information" className="link">
            <h1 className="white">Government Information</h1>
          </Link>
        </div>
        <div className="cell normal about">
          <Link to="/about" className="link">
            <h1 className="black">About</h1>
          </Link>
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default Home;
