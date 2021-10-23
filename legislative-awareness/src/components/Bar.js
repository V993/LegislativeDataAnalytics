import React from "react";
import { Bar } from "react-chartjs-2";

/**
 *  REQUIRED INFORMATION:
 *          - LABELS (we want representatives and committees in two graphs)
 *          - DATA (we want the number of bills per representative and comittee respectively)
 *          - LABEL (in our case, this will always )
 *          - TEXT (the title of the chart)
 *
 *  The required info is filled in with random values below for now.
 */

// Example:
const state = {
  labels: ["Representatives", "Go", "Here"],

  datasets: [
    {
      label: "Actions (Bills)", // The key for the data
      backgroundColor: "rgb(181, 144, 225)",
      borderColor: "rgb(0,0,0)",
      borderWidth: 2,
      data: [1, 2, 3],
    },
  ],
};

export const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Title Goes Here",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};
