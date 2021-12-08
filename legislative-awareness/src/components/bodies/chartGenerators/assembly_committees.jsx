import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Calendar from "./Calendar";
import Typography from "@mui/material/Typography";

const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Committees and Number of Bills Voted On",
    },
  },
  events: ["click", "mousemove"],
  onClick: (event, item) => {
    if (item.length === 0) return; // <--- If the item is canvas and not a bar, dip

    var index_for_click = item[0].index;
    var data_for_click =
      event.chart.config._config.data.datasets[0].data[index_for_click];
    var label_for_click =
      event.chart.config._config.data.labels[index_for_click];

    // console.log(index_for_click);
    // console.log("this is what i got for label:", label_for_click);
    // console.log("this is what i got for datasets:", data_for_click);
  },
};

export default class Committees extends React.Component {
  API_URL = "http://206.81.7.63:5000/graph-apis/state-committee-bills/senate";
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      committees: [],
      votes: [],
      found: false,
      startDate: null,
      endDate: null,
    };
  }

  fetchData = async () => {
    const url = this.getApiUrl(this.state.startDate, this.state.endDate);
    try {
      let response = await axios.get(url);
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
    let committees = [],
      votes = [];

    this.state.apiData.forEach((obj) => {
      committees.push(obj.committeename);
      votes.push(obj.numofbills);
    });

    this.setState({ committees, votes });
  };

  getApiUrl = (start, end) => {
    start = this.state.startDate || "2021-01-01";
    end = this.state.endDate || new Date().toISOString().slice(0, 10);
    if (!start && !end) {
      return this.API_URL;
    }
    return `${this.API_URL}?startDate=${start}&endDate=${end}`;
  };

  handleFromDate = (startDate) => {
    this.setState({ startDate });
    this.fetchData();
  };

  handleToDate = (endDate) => {
    this.setState({ endDate });
    this.fetchData();
  };

  render() {
    return (
      <div className="full">
        <div className="centered-display">
          <Typography variant="h6" component="div" gutterBottom>
            Select a range of dates to preview data
          </Typography>
          <Calendar from={this.handleFromDate} to={this.handleToDate} />
        </div>
        <Bar
          data={{
            labels: this.state.committees,
            datasets: [
              {
                label: "# of Bills Voted On",
                backgroundColor: "rgba(138, 182, 169, 0.9)",
                // linear-gradient( rgba(138, 182, 169, 0.5), rgba(255, 255, 255, 0) )
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.votes,
              },
            ],
          }}
          options={{
            indexAxis: "x",
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Committees and Number of Bills Voted On",
              },
            },
            events: ["click", "mousemove"],
            onClick: (event, item) => {
              if (item.length === 0) return; // <--- If the item is canvas and not a bar, dip

              var idx = item[0].index;
              var value = event.chart.config._config.data.datasets[0].data[idx];
              var label = event.chart.config._config.data.labels[idx];

              // console.log(`Label: ${label}, Value: ${value}, Index: ${idx}`)
              this.props.clickedLabel(label, value);
            },
          }}
        />
        <button className="smolButton" onClick={this.fetchData}>Reset</button>

      </div>
    );
  }
}
