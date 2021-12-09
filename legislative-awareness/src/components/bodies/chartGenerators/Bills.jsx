import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Calendar from "./Calendar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default class Bills extends React.Component {
  API_URL = "http://206.81.7.63:5000/graph-apis/representative-bills";
  REP = "";
  VALUE = -1;
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      reps: [],
      votes: [],
      found: false,
      startDate: null,
      endDate: null,
      deleted: false,
    };
  }

  componentDidMount = async () => {
    await this.fetchData();
  };

  getApiUrl = (start, end) => {
    start = this.state.startDate || "2021-01-01";
    end = this.state.endDate || new Date().toISOString().slice(0, 10);
    if (!start && !end) {
      return this.API_URL;
    }
    return `${this.API_URL}?startDate=${start}&endDate=${end}`;
  };

  fetchData = async () => {
    const url = this.getApiUrl(this.state.startDate, this.state.endDate);
    try {
      let response = await axios.get(url);
      this.setState({ apiData: response.data, found: true });
      this.handleData();
    } catch (error) {
      if (error.response) {
        this.setState({ found: false });
        console.error(`Error: Not Found - ${error.response.data}`); // Not Found
        console.error(`Error: ${error.response.status}`); // 404
      }
    }
  };

  handleData = () => {
    let reps = [],
      votes = [];

    this.state.apiData.forEach((obj) => {
      reps.push(obj.mattersponsorname);
      votes.push(obj.numofbills);
    });

    this.setState({ reps, votes });
  };

  handleFromDate = (startDate) => {
    this.setState({ startDate });
    this.fetchData();
  };

  handleToDate = (endDate) => {
    this.setState({ endDate });
    this.fetchData();
  };

  handleDelete = () => {
    let reps = [...this.state.reps],
      votes = [...this.state.votes];
    const rIndex = reps.indexOf(this.REP),
      vIndex = votes.indexOf(String(this.VALUE));
    if (rIndex > -1) {
      reps.splice(rIndex, 1);
      this.REP = null;
    }
    if (vIndex > -1) {
      votes.splice(vIndex, 1);
    }
    this.setState({ reps, votes, deleted: true });
  };

  handleButton = (label, val) => {
    this.REP = label;
    this.VALUE = val;
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
        {this.REP && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => this.handleDelete(this.label, this.VALUE)}
            className="remove-btn"
          >
            Remove {this.REP}?
          </Button>
        )}
        <Bar
          data={{
            labels: this.state.reps,
            datasets: [
              {
                label: "# of Bills Voted On",
                backgroundColor: "rgba(138, 182, 169, 0.5)",
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
                text: "Representatives and Number of Bills Put Forward",
              },
            },
            onHover: (event, item) => {
              if (item.length === 0) return;

              var idx = item[0].index;
              var VALUE = event.chart.config._config.data.datasets[0].data[idx];
              var label = event.chart.config._config.data.labels[idx];
              this.handleButton(label, VALUE);
              // FIX: doesn't appear
              // <Tooltip title={"Delete" + label + "?"}>
              //   <IconButton>
              //     <DeleteIcon />
              //   </IconButton>
              // </Tooltip>;
            },
            onClick: (event, item) => {
              if (item.length === 0) return; // <--- If the item is canvas and not a bar, dip

              var idx = item[0].index;
              // var VALUE =
              //   event.chart.config._config.data.datasets[0].data[
              //     idx
              //   ];
              var label = event.chart.config._config.data.labels[idx];
              // console.log(`Label: ${label}, Value: ${VALUE}, Index: ${idx}`)

              this.props.clickedLabel(label);
            },
          }}
        />
        <button className="smolButton" onClick={this.fetchData}>
          Reset
        </button>
      </div>
    );
  }
}
