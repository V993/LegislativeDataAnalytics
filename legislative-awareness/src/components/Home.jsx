import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function Home() {
  return (
    <div className="full">
      <Header />
      <div className="grid">
        <div className="cell normal data">
          <Link to="/data" className="">
            <h1 className="white">Data</h1>
          </Link>
        </div>
        <div className="cell beegboi local">
          <Link to="/local-info" className="">
            <h1 className="black">Local Representation</h1>
          </Link>
        </div>
      </div>
      <div className="grid">
        <div className="cell beegboi information">
          <Link to="/information" className="">
            <h1 className="white">Learn About Your Government</h1>
          </Link>
        </div>
        <div className="cell normal about">
          <Link to="/about" className="">
            <h1 className="black">About</h1>
          </Link>
        </div>
      </div>
      <Footer />
      <br></br>
      <br></br>
    </div>
  );
}

export default Home;
