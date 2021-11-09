import React from "react";
import Bills from "./Bills";
import Committees from "./Committees";
import Proximity from "./Proximity";
import Navigation from "./Navigation";
import "./style.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#648a64",
  '&:hover': {
    backgroundColor: "#1b5e20",
  },
  backgroundImage: "linear-gradient( rgba(138, 182, 169, 0.5), rgba(255, 255, 255, 0) )"
}));

export default class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: "bills",
    };
    this.showBills = (e) => this.setState({ chart: "bills" });
    this.showCommittees = (e) => this.setState({ chart: "committees" });
    this.showProximity = (e) => this.setState({ chart: "proximity" });
  }

  render() {
    return (
      <>
        <Navigation />
        <div className="data">
          <div class="container">
            <div class="row align-items-center my-5">
              <div class="col-lg-12">
                <h1 class="font-weight-light">Legislative Data</h1>
                <div>
                  <Stack spacing={2} direction="row" className="toggle-buttons">
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
                {this.state.chart === "bills" ? <Bills /> : <div />}
                {this.state.chart === "committees" ? <Committees /> : <div />}
                {this.state.chart === "proximity" ? <Proximity /> : <div />}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
