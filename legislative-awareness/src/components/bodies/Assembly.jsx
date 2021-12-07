import React from "react";
import Bills from "./chartGenerators/assembly_bills";
import Committees from "./chartGenerators/assembly_committees";
import Proximity from "./chartGenerators/Proximity";
import Sidebar from "react-sidebar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Navigation from "./DataNavbar";
import "./layout.css";
import { Link, 
         DirectLink, 
         Element, 
         Events, 
         animateScroll as scroll, 
         scrollSpy, 
         scroller } from 'react-scroll'

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#648a64",
  "&:hover": {
    backgroundColor: "#1b5e20",
  },
  backgroundImage:
    "linear-gradient(rgba(138, 182, 169, 0.5), rgba(255, 255, 255, 0))",
}));

export default class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: "default",
      sidebarOpen: false,
      label: "",
      value: 0,
      member: {},
    };
    this.showBills = (e) => {this.setState({ chart: "bills" }); this.scrollToBottom()};
    this.showCommittees = (e) => this.setState({ chart: "committees" });
    this.showProximity = (e) => this.setState({ chart: "proximity" });
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleData = this.handleData.bind(this);

    this.scrollToTop = this.scrollToTop.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });

  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  scrollTo() {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open });

  handleData = async (query, value = "") => {
    if (this.state.chart === "bills") {
      let url =
        "http://206.81.7.63:5000/info-apis/assembly-info?name=" + query;

      try {
        let response = await axios.get(url);
        this.setState({
          member: response.data,
          label: query,
          sidebarOpen: true,
        });
      } catch (error) {
        if (error.response) {
          console.error(`Error: Not Found - ${error.response.data}`);
          console.error(`Error: ${error.response.status}`);
        }
      }
    } else if (this.state.chart === "committees") {
      this.setState({
        label: query,
        value,
        sidebarOpen: true,
      });
    }
  };

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    const sidebarContent =
      this.state.chart === "bills" ? (
        <div>
          <h2 className="rep-title">Representative Information</h2>
          {this.state.member === "" ? (
            <p>No results for "{this.state.label}"</p>
          ) : (
            <div className="rep-info">
              <h4 className="rep-name">{this.state.member.name}</h4>
              <small className="rep-details">
                <p>{this.state.member.politicalparty}</p>
                <p>District {this.state.member.district}</p>
                <p>{this.state.member.borough}</p>
              </small>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="rep-title">Committee Information</h2>
          <div className="rep-info">
            <h4 className="rep-name">{this.state.label}</h4>
            <small className="rep-details">
              <p>{this.state.value} bills passed.</p>
            </small>
          </div>
        </div>
      );

    return (
      <>
        <Navigation className="full"/>
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight={true}
          styles={{ sidebar: { background: "white", padding: "1rem" } }}
        >
          <div className="return">
            <Link to="/data" className="clear">Menu</Link>
          </div>

          <div className="four-cell-layout">
            <div className="corner">
              <a className="option reps" onClick={this.showBills} href="#chartLocation">
                {/* <div className="centerText"> */}
                  <h1 className="white">
                    Bills/Represenative
                  </h1>
                  <h4 id="front-text">See how many bills your representatives have put <br></br>on the floor over time and compare.</h4>
                {/* </div> */}
              </a>
            </div>
  
            <div className="corner">
              <a className="option coms" onClick={this.showCommittees} href="#chartLocation">
                <h1 className="white">
                  Bills/Committee
                </h1>
                <h4 id="front-text">See how many bills each committee in City Council <br></br>has put forward over time and compare.</h4>
              </a>
            </div>
  
            <div className="corner">
              <a className="option prox" onClick={this.showProximity} href="#chartLocation">
                <h1 className="white">
                  Voting Proximity Between Representatives
                </h1>
                <h4 id="front-text">Compare the similarity of your representatives using voting data.</h4>
              </a>
            </div>

            <div className="corner">
              <a className="option comp" href="#chartLocation">
                <h1 className="white">
                  Compare Representative Perfomance
                </h1>
                <h4 id="front-text">Compare your representatives activity against others to see how active they've been.</h4>
              </a>
            </div>
          </div>

          {
            this.state.chart === "default" ? (
              <></>
            ) : (
              <div className="return">
                <a className="smolButton" href="#top">Back to Top</a>
              </div>
            )
            
          }
          <br></br>
          <br></br>
          <br></br>
          <h5 id="capital">{this.state.chart}:</h5>
          <br></br>
          {
            this.state.chart === "default" ? (
              <div>Select an option above!</div>
            ) : (
              <div className="divider">
                
              </div>
            )
            
          }

          <div className="">
            <div name="chartLocation">
              {this.state.chart === "bills" ? (
                <Bills clickedLabel={this.handleData} />
              ) : (
                <div />
              )}
              {this.state.chart === "committees" ? (
                <Committees clickedLabel={this.handleData} />
              ) : (
                <div />
              )}
              {this.state.chart === "proximity" ? <Proximity /> : <div />}
            </div>
            <div onClick={this.scrollToTop()}>Back to Top</div>
          </div>
        </Sidebar>
      </>
    );
  }
}
