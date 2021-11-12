import React from "react";
import Bills from "./Bills";
import Committees from "./Committees";
import Proximity from "./Proximity";
import Navigation from "./Navigation";
import Sidebar from "react-sidebar";
import "./style.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

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
    };
    this.showBills = (e) => this.setState({ chart: "bills" });
    this.showCommittees = (e) => this.setState({ chart: "committees" });
    this.showProximity = (e) => this.setState({ chart: "proximity" });
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open });

  handleData = (data) => {
    this.setState({ label: data, sidebarOpen: true });
  };

  render() {
    const sidebarContent = (
      <div>
        <h3>Representative Information</h3>
        <p>{this.state.label}</p>
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
