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
      <div>
        <Link to="data/CityData" className="Link">New York City Council</Link>
        <Link to="data/AssemblyData" className="Link">New York State Assembly</Link>
        <Link to="data/SenateData" className="Link">New York State Senate</Link>
      </div>
    );
  }
}


export default DataNavigation;