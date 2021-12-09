import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Navigation,
  Footer,
  Home,
  Local,
  Data,
  Information,
  NotFound,
} from "./components";

import { City, Assembly, Senate } from "./components";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* { useLocation().pathname != "/" && useLocation().pathname != "/NotFound" && <Navigation/>} */}

          <Route path="/" exact component={() => <Home />}></Route>
          <Route path="/NotFound" component={NotFound}></Route>
          <Route path="/data/CityData" exact component={() => <City />}></Route>
          <Route
            path="/data/AssemblyData"
            exact
            component={() => <Assembly />}
          ></Route>
          <Route
            path="/data/SenateData"
            exact
            component={() => <Senate />}
          ></Route>

          <>
            <Navigation />
            <Route path="/data" exact component={() => <Data />}></Route>
            <Route path="/local-info" exact component={Local}></Route>
            <Route path="/information" exact component={Information}></Route>
            <Footer />
          </>

          <Route path="*">
            <Redirect to="/NotFound"></Redirect>
          </Route>

          {/* { useLocation().pathname != "/" && useLocation().pathname != "/NotFound" && <Footer/> } */}
          {/* <Route path="/about" exact component={() => <About />}></Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
