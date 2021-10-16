import './App.css'
import icon from "./icon.jpg"

import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Navigation, Footer, Home} from "./components"


function App() {
    return (
        <div className="App">
        <Router>
            <Navigation />
                <Switch>
                    <Route path="/" exact component={() => <Home />}></Route>
                    {/* <Route path="/" exact component={() => <Home />} /> */}
                </Switch>
            <Footer />
        </Router>
        </div>
    );
}

export default App;
