import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Calendar from "./Calendar";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';

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
      text: "Representatives and Number of Bills Voted On",
    },
  },
};

export default class Proximity extends React.Component {
  API_URL = "http://206.81.7.63:5000/graph-apis/representative-bills";
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      reps: [],
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
    let reps = [],
      votes = [];

    this.state.apiData.map((obj) => {
      reps.push(obj.mattersponsorname);
      votes.push(obj.numofbills);
    });

    this.setState({ reps, votes });
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
      <div>
        <Typography variant="h6" component="div" gutterBottom>Select a range of dates to preview data</Typography>
        <Calendar from={this.handleFromDate} to={this.handleToDate} />
        <Bar
          data={{
            labels: this.state.reps,
            datasets: [
              {
                label: "# of Bills Voted On",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.votes,
              },
            ],
          }}
          options={options}
        />
      </div>
    );
  }
}
