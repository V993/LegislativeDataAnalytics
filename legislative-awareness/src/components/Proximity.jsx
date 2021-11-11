import React from "react";
import axios from "axios";
import { Scatter } from 'react-chartjs-2';
// import Calendar from "./Calendar";
import Typography from '@mui/material/Typography';
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
  events: ['click','mousemove'],
  onClick: (event,item) => {
    if (item.length === 0) return // <--- If the item is canvas and not a bar, dip

    var index_for_click = item[0].index
    var data_for_click = event.chart.config._config.data.datasets[0].data[index_for_click]
    var label_for_click = event.chart.config._config.data.labels[index_for_click]

    console.log(index_for_click)
    console.log('this is what i got for label:', data_for_click);
    console.log('this is what i got for datasets:', label_for_click);

    
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

  nameToColor = (name) => {
    if (name === "George Costanza") { return "rgba(255, 247, 0, 1.0)"; }
    if (name === "Jerry Seinfeld") { return "rgba(233, 0, 255, 1.0)"; }
    if (name === "Elaine Benes") { return "rgba(0, 204, 255, 1.0)"; }
    if (name === "Cosmo Kramer") { return "rgba(255, 0, 0, 1.0)"; }
    if (name === "Newman") { return "rgba(5, 255, 0, 1.0)"; }
  }

  parseData = () => {
    let datasets = [];

    this.state.apiData.forEach((obj) => {
      datasets.push({label: obj.repName, data: [{ x: obj.x, y: obj.y }], backgroundColor: this.nameToColor(obj.repName)})
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
    this.setState({ repx }, function() {this.fetchData();});
  };

  handleRepY = (repy) => {
    console.log("repy changed to " + repy);
    this.setState({ repy }, function() {this.fetchData();});
  };

  render() {
    return (
      <div>
        <Typography variant="h6" component="div" gutterBottom>Select two representatives to preview data</Typography>
        <div>
          <div className="proximity-dropdown-div">
            <h4>X Axis Representative</h4>
            <Dropdown options={dropOptions} value={dropOptions[0]} onChange={e => this.handleRepX(e.value)}/>
          </div>
          <div className="proximity-dropdown-div">
            <h4>Y Axis Representative</h4>
            <Dropdown options={dropOptions} value={dropOptions[1]} onChange={e => this.handleRepY(e.value)}/>
          </div>
        </div>
        <Scatter data={this.state} options={options} />main
      </div>
    );
  }
}
