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

        <Link to="data/CityData" className="cell pillar city"></Link>
        <Link to="data/AssemblyData" className="cell pillar assembly"></Link>
        <Link to="data/SenateData" className="cell pillar senate"></Link>

        {/* <div className="cell pillar city"><Link to="data/CityData" className="Link">New York City Council</Link></div>
        <div className="cell pillar assembly"><Link to="data/AssemblyData" className="Link">New York State Assembly</Link></div>
        <div className="cell pillar senate"><Link to="data/SenateData" className="Link">New York State Senate</Link></div> */}
      </div>
    );
  }
}


export default DataNavigation;