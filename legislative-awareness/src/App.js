import "./App.css";
import icon from "./icon.jpg";

import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Navigation, Footer, Home, Local, Data, Information } from "./components";

import { useHistory } from 'react-router-dom';

const HomeComponent = () => {
    const history = useHistory()
  
    const handleClick = () => {
      history.push("/")
    }
}

function App() {
    return (
        <div className="App">
            <div>
                <Router>
                        <Switch>
                            <Route path="/" exact component={() => <Home />}></Route>
                            <Route path="/data" exact component={() => <Data />}></Route>
                            <Route path="/local-info" exact component={Local}></Route>
                            <Route path="/information" exact component={Information}></Route>
                            {/* <Route path="/about" exact component={() => <About />}></Route> */}
                        </Switch>
                    <Footer />
                </Router>   
            </div>
            
        </div>
    );

}

export default App;
