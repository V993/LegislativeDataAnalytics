import React from "react";
import axios from "axios";
import { Scatter } from 'react-chartjs-2';
import Calendar from "./Calendar";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const dropOptions = [
  'George Costanza','Jerry Seinfeld','Elaine Benes','Cosmo Kramer'
];

export default class Proximity extends React.Component {
  API_URL = "http://206.81.7.63:5000/graph-apis/proximity-calculation";
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      datasets: [],
      names: [],
      x: [],
      y: [],
      found: false,
      repx: "George Costanza",
      repy: "Jerry Seinfeld",
    };
  }

  fetchData = async () => {
    console.log("fetchData()");
    const url = this.getApiUrl(this.state.repx, this.state.repy);
    console.log(url);
    try {
      let response = await axios.get(url);
      console.log(response);
      this.setState({ apiData: response.data, found: true });
      this.parseData();
    } catch (error) {
      if (error.response) {
        this.setState({ found: false });
        console.error(`Error: Not Found - ${error.response.data}`); // Not Found
        console.error(`Error: ${error.response.status}`); // 404
      }
    }
  };

  componentDidMount = async () => {
    await this.fetchData();
  };

  parseData = () => {
    let datasets = [];

    this.state.apiData.map((obj) => {
      datasets.push({label: obj.repName, data: [{ x: obj.x, y: obj.y }], backgroundColor: 'rgba(255, 99, 132, 1)'})
    });
    console.log(datasets);
    this.setState({ datasets });
  };

  getApiUrl = (repx, repy) => {
    if (!repx && !repy) {
      return this.API_URL;
    }
    return `${this.API_URL}?repx=${repx.replace(' ','_')}&repy=${repy.replace(' ','_')}`;
  };

  handleRepX = (repx) => {
    console.log("repx changed to " + repx);
    this.setState({ repx });
    this.fetchData();
  };

  handleRepY = (repy) => {
    console.log("repy changed to " + repy);
    this.setState({ repy });
    this.fetchData();
  };

  render() {
    return (
      <div>
        <h4>Select two representatives to preview data</h4>
        <div>
          <div class="proximity-dropdown-div">
            <h4>X Axis Representative</h4>
            <Dropdown options={dropOptions} value={dropOptions[0]} onChange={e => this.handleRepX(e.value)}/>
          </div>
          <div class="proximity-dropdown-div">
            <h4>Y Axis Representative</h4>
            <Dropdown options={dropOptions} value={dropOptions[1]} onChange={e => this.handleRepY(e.value)}/>
          </div>
        </div>
        <Scatter data={this.state} options={options} />
      </div>
    );
  }
}
