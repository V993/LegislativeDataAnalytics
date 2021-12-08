import React from "react";
import Bills from "./chartGenerators/senate_bills";
import Committees from "./chartGenerators/senate_committees";
import Proximity from "./chartGenerators/Proximity";
import Sidebar from "react-sidebar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Navigation from "./DataNavbar";
import "./layout.css";

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
    this.showBills = (e) => {this.setState({ chart: "bills" })};
    this.showCommittees = (e) => this.setState({ chart: "committees" });
    this.showProximity = (e) => this.setState({ chart: "proximity" });
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open });

  handleData = async (query, value = "") => {
    if (this.state.chart === "bills") {
      let url =
        "http://206.81.7.63:5000/info-apis/senate-info?name=" + query;

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
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight={true}
          styles={{ sidebar: { background: "white", padding: "1rem" } }}
        >
          {/* <Navigation /> */}
          {/* <div className=""> */}
            {/* <Stack
              direction="row"
            > */}
              <div className="four-cell-layout">
                <div className="corner">
                  <div className="option reps" onClick={this.showBills}>
                    {/* <div className="centerText"> */}
                      <h1 className="white">
                        Bills/Represenative
                      </h1>
                      <h4 id="front-text">See how many bills your representatives have put <br></br>on the floor over time and compare.</h4>
                    {/* </div> */}
                  </div>
                </div>
      
                <div className="corner">
                  <div className="option coms" onClick={this.showCommittees}>
                    <h1 className="white">
                      Bills/Committee
                    </h1>
                    <h4 id="front-text">See how many bills each committee in City Council <br></br>has put forward over time and compare.</h4>
                  </div>
                </div>
      
                <div className="corner">
                  <div className="option prox" onClick={this.showProximity}>
                    <h1 className="white">
                      Voting Proximity Between Representatives
                    </h1>
                    <h4 id="front-text">Compare the similarity of your representatives using voting data.</h4>
                  </div>
                </div>

                <div className="corner">
                  <div className="option comp">
                    <h1 className="white">
                      Compare Representative Perfomance
                    </h1>
                    <h4 id="front-text">Compare your representatives activity against others to see how active they've been.</h4>
                  </div>
                </div>
              </div>
            {/* </Stack> */}
          {/* </div> */}

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
