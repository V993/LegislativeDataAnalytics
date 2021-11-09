import React, { useEffect, useState } from "react";
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
      text: "Representatives and Number of Bills Put Forward",
    },
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

export default function Bills() {
  let API_URL = "http://206.81.7.63:5000/graph-apis/representative-bills";
  const [apiData, setApidata] = useState({});
  const [reps, setReps] = useState([]);
  const [votes, setVotes] = useState([]);
  const [found, setFound] = useState(false);
  const [startDate, setStart] = useState(null);
  const [endDate, setEnd] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await fetchData();
      console.log(response);
    }
    getData();
  });

  const getApiUrl = (start, end) => {
    start = startDate || "2021-01-01";
    end = endDate || new Date().toISOString().slice(0, 10);
    if (!start && !end) {
      return API_URL;
    }
    return `${API_URL}?startDate=${start}&endDate=${end}`;
  };

  const fetchData = async () => {
    const url = getApiUrl(startDate, endDate);
    try {
      let response = await axios.get(url);
      setApidata(response.data);
      setFound(true);
      handleData();
    } catch (error) {
      if (error.response) {
        setFound(false);
        console.error(`Error: Not Found - ${error.response.data}`); // Not Found
        console.error(`Error: ${error.response.status}`); // 404
      }
    }
  };

  const handleData = () => {
    let reps = [],
      votes = [];

    apiData.forEach((obj) => {
      reps.push(obj.mattersponsorname);
      votes.push(obj.numofbills);
    });

    setReps(reps);
    setVotes(votes);
  };

  const handleFromDate = (startDate) => {
    setStart(startDate);
    fetchData();
  };

  const handleToDate = (endDate) => {
    setEnd(endDate);
    fetchData();
  };

  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        Select a range of dates to preview data
      </Typography>
      <Calendar from={handleFromDate} to={handleToDate} />
      <Bar
        data={{
          labels: reps,
          datasets: [
            {
              label: "# of Bills Voted On",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
              data: votes,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}
