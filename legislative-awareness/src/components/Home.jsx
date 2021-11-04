import React from "react";
import "./style.css";
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

const HomeComponent = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push("/")
  }
}


function Home() {
  return (
    <div className="">

      <div className="grid">
        <div className="cell normal data">
          <Link to="/data">
            <h1>Data</h1>
          </Link>
        </div>
        <div className="cell beegboi local">
          <Link to="/local-info">
            <h1>Local Representation</h1>
          </Link>
        </div>
      </div>
      <div className="grid">
        <div className="cell beegboi information">
          <Link to="/information">
            <h1 className="white">Government Information</h1>
          </Link> 
        </div>
        <div className="cell normal about">
          <Link to="/about">
            <h1>About</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

{/* <div className="row">
<div className="cell normal">box1</div>
<div className="cell normal">box2</div>
</div>
<div className="row">
<div className="cell normal">box3</div>
<div className="cell normal">box4</div>
</div>
</div> */}