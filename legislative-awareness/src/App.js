import "./App.css";

import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Footer, Home, Local, Data, Information } from "./components";

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
