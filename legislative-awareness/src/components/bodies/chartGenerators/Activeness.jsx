import React from "react";
import axios from "axios";
import "../../../App.css";
import { Bar } from "react-chartjs-2";
import Typography from "@mui/material/Typography";
import Datetime from "react-datetime";

export default class Activeness extends React.Component {
  API_URL = "http://localhost:5000/graph-apis/activeness-by-month";
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      reps: [],
      months: [],
      votes: [],
      found: false,
      year: null,
    };
  }

  fetchData = async () => {
    const url = this.getApiUrl(this.state.year);
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
      months = [],
      votes = [];

    this.state.apiData.forEach((obj) => {
      reps.push(obj.mattersponsorname);
      months.push(obj.month);
      votes.push(obj.numofbills);
    });

    this.setState({ reps, months, votes });
  };

  getApiUrl = (year) => {
    year = this.state.year || new Date().toISOString().slice(0, 4);
    if (!year) {
      return this.API_URL + "?year=2021";
    }
    return `${this.API_URL}?year=${year}`;
  };

  handleYear = (date) => {
    this.setState({ year: date.year() });
  };

  render() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div>
        <Typography variant="h6" component="div" gutterBottom>
          Select a year to view representative activeness
        </Typography>
        <Datetime dateFormat="YYYY" onChange={this.handleYear} />
        <Typography variant="body1" component="div" gutterBottom>
          {this.state.year && "Year selected: " + this.state.year}
        </Typography>
        <Bar
          type="line"
          data={{
            labels: months,
            datasets: [
              {
                label: "# of Bills Voted On",
                backgroundColor: "rgba(138, 182, 169, 0.9)",
                // linear-gradient( rgba(138, 182, 169, 0.5), rgba(255, 255, 255, 0) )
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: this.state.votes,
              },
              {
                label: "Margaret S. Chin",
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
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                stacked: false,
                title: {
                  display: true,
                  text: "Value",
                },
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Representative Voting History by Month",
              },
            }
          }}
        />
      </div>
    );
  }
}
