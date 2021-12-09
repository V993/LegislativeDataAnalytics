import React from "react";
import Chart from "react-chartjs-2";
import Typography from "@mui/material/Typography";

export default class Activeness extends React.Component {
  // SO: questions/25594478/different-color-for-each-bar-in-a-bar-chart-chartjs
  randomColor = () => {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

    const datasets = [
      {
        label: "Ruben Diaz, Sr.",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "(in conjunction with the Brooklyn Borough President)",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Oswald Feliz",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 0, 1, 4, 1, 1, 0, 2, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Eric A. Ulrich",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 0, 1, 0, 0, 2, 0, 1, 2, 0, 0],
        tension: 0.1,
      },
      {
        label: "(by request of the Manhattan Borough President)",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "By the Committee on Public Safety",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "(by request of the Mayor)",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 1, 10, 1, 2, 0, 0, 0, 3, 0, 0],
        tension: 0.1,
      },
      {
        label: "Alan N. Maisel",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 0, 1, 2, 7, 3, 3, 0, 1, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Selvena N. Brooks-Powers",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 2, 1, 6, 5, 0, 5, 0, 4, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Public Advocate Jumaane Williams",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 3, 1, 12, 2, 0, 4, 2, 2, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Paul A. Vallone",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 2, 0, 4, 2, 1, 2, 2, 3, 5, 0, 0],
        tension: 0.1,
      },
      {
        label: "Joseph C. Borelli",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 2, 0, 1, 0, 0, 0, 0, 0, 10, 0, 0],
        tension: 0.1,
      },
      {
        label: "Eric Dinowitz",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 2, 1, 4, 3, 2, 5, 2, 4, 3, 0, 0],
        tension: 0.1,
      },
      {
        label: "Costa G. Constantinides",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Corey D. Johnson",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [0, 8, 2, 5, 2, 0, 1, 1, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Ydanis A. Rodriguez",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 3, 0, 4, 5, 0, 0, 0, 2, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Vanessa L. Gibson",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 7, 2, 5, 5, 0, 4, 0, 3, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Steven Matteo",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Stephen T. Levin",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [2, 7, 1, 2, 2, 0, 3, 4, 3, 3, 0, 0],
        tension: 0.1,
      },
      {
        label: "Robert F. Holden",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 9, 3, 6, 6, 7, 6, 11, 3, 6, 0, 0],
        tension: 0.1,
      },
      {
        label: "Robert E. Cornegy, Jr.",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [2, 3, 1, 12, 6, 10, 3, 4, 2, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Rafael Salamanca, Jr.",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [20, 26, 36, 46, 44, 22, 4, 23, 51, 29, 0, 0],
        tension: 0.1,
      },
      {
        label: "Peter A. Koo",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 2, 0, 1, 2, 1, 5, 3, 2, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Mathieu Eugene",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Mark Treyger",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 5, 0, 3, 3, 0, 2, 1, 0, 2, 0, 0],
        tension: 0.1,
      },
      {
        label: "Mark Levine",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [3, 2, 2, 6, 5, 0, 1, 1, 2, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Mark Gjonaj",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 7, 2, 9, 2, 15, 0, 2, 1, 2, 0, 0],
        tension: 0.1,
      },
      {
        label: "Margaret S. Chin",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [3, 9, 1, 20, 8, 2, 2, 0, 2, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Laurie A. Cumbo",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 4, 0, 5, 6, 0, 4, 0, 4, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Kevin C. Riley",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 5, 11, 7, 9, 14, 5, 5, 5, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Keith Powers",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [2, 3, 1, 6, 6, 2, 2, 5, 6, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Karen Koslowitz",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [2, 6, 2, 8, 4, 0, 4, 2, 8, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Inez D. Barron ",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [4, 5, 3, 11, 3, 0, 1, 1, 1, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "James F. Gennaro",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 6, 2, 10, 8, 1, 3, 1, 2, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "James G. Van Bramer",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [3, 7, 3, 14, 2, 1, 4, 1, 2, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Justin L. Brannan",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [2, 4, 1, 14, 3, 2, 5, 3, 5, 2, 0, 0],
        tension: 0.1,
      },
      {
        label: "Kalman Yeger",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [5, 9, 4, 5, 13, 12, 13, 8, 6, 11, 0, 0],
        tension: 0.1,
      },
      {
        label: "I. Daneek Miller",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 4, 1, 4, 4, 2, 0, 2, 3, 4, 0, 0],
        tension: 0.1,
      },
      {
        label: "Helen K. Rosenthal",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [3, 16, 5, 22, 16, 4, 3, 1, 7, 2, 0, 0],
        tension: 0.1,
      },
      {
        label: "Francisco P. Moya",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [3, 10, 18, 12, 23, 12, 2, 5, 5, 9, 0, 0],
        tension: 0.1,
      },
      {
        label: "Fernando Cabrera",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [5, 3, 1, 10, 1, 2, 0, 0, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Farah N. Louis",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [8, 10, 7, 21, 5, 8, 4, 15, 1, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Diana Ayala",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 6, 5, 14, 5, 1, 5, 3, 1, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Deborah L. Rose",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [5, 1, 1, 4, 2, 1, 2, 0, 2, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Darma V. Diaz",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [3, 2, 1, 3, 3, 2, 4, 5, 0, 2, 0, 0],
        tension: 0.1,
      },
      {
        label: "Daniel Dromm",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 10, 4, 18, 21, 34, 8, 11, 9, 4, 0, 0],
        tension: 0.1,
      },
      {
        label: "Carlos Menchaca",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 1, 3, 17, 6, 3, 2, 3, 4, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Carlina Rivera",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [8, 11, 3, 21, 6, 1, 3, 1, 7, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "(by request of the Brooklyn Borough President)",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Brad S. Lander",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [7, 9, 5, 12, 6, 1, 2, 1, 4, 1, 0, 0],
        tension: 0.1,
      },
      {
        label: "Adrienne E. Adams",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [2, 4, 2, 3, 5, 0, 5, 2, 6, 3, 0, 0],
        tension: 0.1,
      },
      {
        label: "Alicka Ampry-Samuel",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 8, 4, 4, 5, 2, 3, 1, 1, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Antonio Reynoso",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 0, 4, 15, 3, 4, 3, 2, 4, 0, 0, 0],
        tension: 0.1,
      },
      {
        label: "Barry S. Grodenchik",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 1, 0, 5, 0, 0, 1, 0, 0, 2, 0, 0],
        tension: 0.1,
      },
      {
        label: "Ben Kallos",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [9, 27, 6, 23, 19, 6, 4, 8, 8, 5, 0, 0],
        tension: 0.1,
      },
      {
        label: "Bill Perkins",
        backgroundColor: "rgba(138, 182, 169, 0.5)",
        borderColor: this.randomColor,
        borderWidth: 1,
        data: [1, 3, 1, 0, 0, 9, 1, 0, 0, 1, 0, 0],
        tension: 0.1,
      },
    ];

    const chartData = {
      labels: months,
      datasets,
    };

    return (
      <>
        <Typography variant="h6" component="div" align="center" gutterBottom>
          Representative Activeness by Month
        </Typography>
        <Chart
          type="line"
          data={chartData}
          options={{
            plugins: {
              title: {
                display: false,
                text: (ctx) =>
                  "Representative Activeness by Month" +
                  ctx.chart.options.scales.y.stacked,
              },
              legend: {
                display: true,
                position: "bottom",
              },
              tooltip: {
                mode: "index",
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
                  text: "Votes",
                },
              },
            },
          }}
        />
      </>
    );
  }
}
