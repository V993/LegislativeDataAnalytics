import React, { Component } from "react";
import { Link } from "react-router-dom";

class DataNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="pillars">
        <Link to="data/CityData" style={{ textDecoration: 'none' }} className="cell pillar city">
          <div className="centerText">
            <h3 id="title">New York City Council</h3>
            <p id="text">
              Here you can find data directly from the Legistar API,
              NY City Council's interface to view data straight from
              the city chambers.
              <br></br>
              <br></br>
              You can experiment with different inputs and see
              how the NY City Council has operated over time.
              <br></br>
              <br></br>
              Our data for the New York City Council includes information 
              from as far back as 1998 and is continually updated with 
              each legislative session.
            </p>
          </div>
        </Link>
        <Link to="data/AssemblyData" style={{ textDecoration: 'none' }} className="cell pillar assembly">
          <div className="centerText">
            <h4 id="title">New York State Assembly</h4>
            <p id="text">
              Here you can find data directly from the Open Legislation 
              API, an open source web service developed in-house by the 
              New York State Assembly.
              <br></br>
              <br></br>
              You can experiment with different inputs and see
              how the NY Assembly has operated over time.
              <br></br>
              <br></br>
              Our data for the New York State Assembly includes information 
              from as far back as 1998.
            </p>
          </div>
        </Link>
        <Link to="data/SenateData" style={{ textDecoration: 'none' }} className="cell pillar senate">
          <div className="centerText">
          <h3 id="title">New York State Senate</h3>
            <p id="text">
              Here you can find data directly from the Open Legislation 
              API, an open source web service developed in-house by the 
              New York State Senate.
              <br></br>
              <br></br>
              You can experiment with different inputs and see
              how the NY Senate has operated over time.
              <br></br>
              <br></br>
              Our data for the New York State Senate includes information 
              from as far back as 1998.
            </p>
          </div>
        </Link>
        {/* <div className="cell pillar city"><Link to="data/CityData" className="Link">New York City Council</Link></div>
        <div className="cell pillar assembly"><Link to="data/AssemblyData" className="Link">New York State Assembly</Link></div>
        <div className="cell pillar senate"><Link to="data/SenateData" className="Link">New York State Senate</Link></div> */}
      </div>
    );
  }
}


export default DataNavigation;