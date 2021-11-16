import React from "react";
import Bills from "./chartGenerators/Bills";
import Committees from "./chartGenerators/Committees";
import Proximity from "./chartGenerators/Proximity";
import Navigation from "./Navigation";
import Sidebar from "react-sidebar";
// import "./style.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";

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
      chart: "bills",
      sidebarOpen: false,
      label: "",
      member: {},
    };
    this.showBills = (e) => this.setState({ chart: "bills" });
    this.showCommittees = (e) => this.setState({ chart: "committees" });
    this.showProximity = (e) => this.setState({ chart: "proximity" });
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open });

  handleData = async (query) => {
    let url =
      "http://206.81.7.63:5000/info-apis/council-member-info?name=" + query;

    try {
      let response = await axios.get(url);
      this.setState({ member: response.data, label: query, sidebarOpen: true });
    } catch (error) {
      if (error.response) {
        console.error(`Error: Not Found - ${error.response.data}`);
        console.error(`Error: ${error.response.status}`);
      }
    }
  };

  render() {
    const sidebarContent = (
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
          <Navigation />

          <div className="data">
            <div className="container">
              <div className="row align-items-center my-5">
                <div className="col-lg-12">
                  <h1 className="font-weight-light">Legislative Data</h1>
                  <div>
                    <Stack
                      spacing={2}
                      direction="row"
                      className="toggle-buttons"
                    >
                      <ColorButton
                        variant="contained"
                        color="success"
                        onClick={this.showBills}
                      >
                        Bills Sponsored by a Representative
                      </ColorButton>
                      <ColorButton
                        variant="contained"
                        color="success"
                        onClick={this.showCommittees}
                      >
                        Bills Considered by a Committee
                      </ColorButton>
                      <ColorButton
                        variant="contained"
                        color="success"
                        onClick={this.showProximity}
                      >
                        Voting Proximity Between Representatives
                      </ColorButton>
                    </Stack>
                  </div>
                  {this.state.chart === "bills" ? (
                    <Bills clickedLabel={this.handleData} />
                  ) : (
                    <div />
                  )}
                  {this.state.chart === "committees" ? <Committees /> : <div />}
                  {this.state.chart === "proximity" ? <Proximity /> : <div />}
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      </>
    );
  }
}
