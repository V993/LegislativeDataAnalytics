import React from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
// import Calendar from "./Calendar";
import Typography from "@mui/material/Typography";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Select from 'react-select';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


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
  events: ["click", "mousemove"],
  onClick: (event, item) => {
    if (item.length === 0) return; // <--- If the item is canvas and not a bar, dip

    var index_for_click = item[0].index;
    var data_for_click =
      event.chart.config._config.data.datasets[0].data[index_for_click];
    var label_for_click =
      event.chart.config._config.data.labels[index_for_click];

    console.log(index_for_click)
    console.log("this is what i got for label:", label_for_click);
    console.log("this is what i got for datasets:", data_for_click);


  },
};

export default class Proximity extends React.Component {
  API_URL = "http://127.0.0.1:5000/graph-apis/proximity-calculation";
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      labels: [],
      datasets: [],
      names: [],
      found: false,
      refs: [],
      targets: []
    };
  }

  fetchData = async () => {
    const url = this.getApiUrl(this.state.refs, this.state.targets);
    console.log(url);
    try {
      let response = await axios.get(url);
      console.log(response);
      this.setState({ apiData: response.data, found: true }, function () { this.parseData(); });
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

  stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    colour += '90';
    return colour;
  }

  nameToColor = (name) => {
    console.log(this.stringToColour(name));
    return this.stringToColour(name);
  };

  parseData = () => {
    let datasets = [];
    let labels = [];

    this.state.refs.forEach((obj) => {
      labels.push(obj.label);
    });
    let scatter = (this.state.refs.length == 2);

    this.state.apiData.forEach((obj) => {
      if (scatter) {
        datasets.push({
          label: obj.repName,
          data: [{ x: obj.coordinates[0], y: obj.coordinates[1] }],
          backgroundColor: this.nameToColor(obj.repName),
        });
      }
      else {
        let ncords = obj.coordinates;
        for (let i = 0; i < ncords.length; i++) {
          if (ncords[i] != 0) {
            ncords[i] = 1 / ncords[i];
          }
          else {
            ncords[i] = 1;
          }
        }
        datasets.push({
          label: obj.repName,
          data: ncords,
          backgroundColor: this.nameToColor(obj.repName),
        });
      }
    });
    this.setState({ labels, datasets }, function () {
      console.log(this.state);
    });
  };

  getApiUrl = (refs, targets) => {
    if (!refs && !targets) {
      return this.API_URL;
    }
    let r = "refs[]=";
    for (let i = 0; i < refs.length; i++) {
      //r += refs[i].value.replace(/ /g,"_");
      r += refs[i].value.split(' ').join('_');
      if (i != refs.length - 1) { r += ','; }
    }
    let t = "targets[]=";
    for (let i = 0; i < targets.length; i++) {
      //t += targets[i].value.replace(/ /g,"_ ");
      t += targets[i].value.split(' ').join('_');
      if (i != targets.length - 1) { t += ','; }
    }
    return `${this.API_URL}?${r}&${t}`;
  };

  handleRefChange = (refs) => {
    this.setState({ refs }, function () {
      this.fetchData();
    });
  };

  handleTargetChange = (targets) => {
    this.setState({ targets }, function () {
      this.fetchData();
    });
  };

  render() {

    let selectRefsOptions = [
      { value: 'Mary Pinkett', label: 'Mary Pinkett' },
      { value: 'Herbert E. Berman', label: 'Herbert E. Berman' },
      { value: 'Archie W. Spigner', label: 'Archie W. Spigner' },
      { value: 'Wendell Foster', label: 'Wendell Foster' },
      { value: 'Sheldon S. Leffler', label: 'Sheldon S. Leffler' },
      { value: 'Stanley E. Michels', label: 'Stanley E. Michels' },
      { value: 'June M. Eisland', label: 'June M. Eisland' }
    ]

    let selectTargetsOptions = selectRefsOptions;

    let graph;
    if (this.state.refs.length <= 2) { graph = <Scatter data={this.state} options={options} /> }
    else if (this.state.datasets[0].data.length > 2) { graph = <Radar data={this.state} /> }

    return (
      <div>
        <Typography variant="h6" component="div" gutterBottom>
          Select at least two representatives to preview data
        </Typography>
        <div>
          <div className="proximity-dropdown-div">
            <h4>Reference representatives</h4>
            <Select isMulti options={selectRefsOptions} onChange={(e) => this.handleRefChange(e)} />
          </div>
          <div className="proximity-dropdown-div">
            <h4>Representatives to be compared</h4>
            <Select isMulti options={selectTargetsOptions} onChange={(e) => this.handleTargetChange(e)} />
          </div>
        </div>
        <div>
          {graph}
        </div>
      </div>
    );
  }
}
