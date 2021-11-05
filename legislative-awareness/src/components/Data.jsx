import React from "react";
import Bills from "./Bills";
import Committees from "./Committees";
import Proximity from "./Proximity";
import Navigation from "./Navigation";
import Sidebar from "react-sidebar";

export default class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: "bills",
      sidebarOpen: false,
    };
    this.showBills = (e) => this.setState({ chart: "bills" });
    this.showCommittees = (e) => this.setState({ chart: "committees" });
    this.showProximity = (e) => this.setState({ chart: "proximity" });
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open });

  render() {
    return (
      <>
        <Navigation />
        <Sidebar
          sidebar={<h3>Representative Info</h3>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight={true}
          styles={{ sidebar: { background: "white", padding: "1rem" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
        </Sidebar>
        <div className="data">
          <div class="container">
            <div class="row align-items-center my-5">
              <div class="col-lg-12">
                <h1 class="font-weight-light">Legislative Data</h1>
                <div>
                  <button class="data-select-button" onClick={this.showBills}>
                    Bills Sponsored by a Representative
                  </button>
                  <button
                    class="data-select-button"
                    onClick={this.showCommittees}
                  >
                    Bills Considered by a Committee
                  </button>
                  <button
                    class="data-select-button"
                    onClick={this.showProximity}
                  >
                    Voting Proximity Between Representatives
                  </button>
                </div>
                {this.state.chart == "bills" ? <Bills /> : <div />}
                {this.state.chart == "committees" ? <Committees /> : <div />}
                {this.state.chart == "proximity" ? <Proximity /> : <div />}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
