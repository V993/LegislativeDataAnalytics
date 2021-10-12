import './App.css'
import icon from "./icon.jpg"

import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios"

import ZipData from "./components/zip-data"
import DataTest from "./components/data-test"

class App extends Component {

  constructor() {
    super()
    this.state = {}
  };

  render() {
    const testAPI = () => {
      <DataTest></DataTest>
    }
    const zipInfo = () => {
      <ZipData></ZipData>
    }
  
    return (
      <div className="page">
        <div className="wrapper">
          <img src={icon} alt="Logo"></img>
          <h3> Welcome!</h3>
        </div>

        <div className="content">
          <div id="flashy">
            <h3> Get info based on your location </h3>
          </div>
          <div className="spacer">

          </div>
          <div id="flashy">
            <h3> Get data from government repositories </h3>
          </div>
          <Router>
            <Switch>
              <Route exact path="/api-query/" render={testAPI} />
              <Route exact path="/zip-info/" render={zipInfo} />
            </Switch>
          </Router>
        </div>
        
      </div>
  );
};
}

export default App;
