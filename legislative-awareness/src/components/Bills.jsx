import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

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

export default class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      reps: [],
      votes: [],
      found: false,
    };
  }

  componentDidMount = async () => {
    let apiUrl =
      "http://localhost:5000/graph-apis/representative-bills?startDate=2021-01-01";

    try {
      let response = await axios.get(apiUrl);
      this.setState({ apiData: response.data, found: true });
      this.parseData();
    } catch (error) {
      if (error.response) {
        this.setState({ found: false });
        console.log(`Error: Not Found - ${error.response.data}`); // Not Found
        console.log(`Error: ${error.response.status}`); // 404
      }
    }
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

  render() {
    return (
      <div>
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
