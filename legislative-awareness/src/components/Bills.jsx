import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: [
    "Adrienne E. Adams",
    "Alan N. Maisel",
    "Alicka Ampry-Samuel",
    "Antonio Reynoso",
    "Barry S. Grodenchik",
    "Ben Kallos",
    "Bill Perkins",
    "Brad S. Lander",
    "Carlina Rivera ",
    "Carlos Menchaca",
    "Corey D. Johnson",
    "Costa G. Constantinides",
    "Daniel Dromm ",
    "Darma V. Diaz",
    "Deborah L. Rose",
    "Diana Ayala ",
    "Eric A. Ulrich",
    "Eric Dinowitz",
    "Farah N. Louis",
    "Fernando Cabrera ",
    "Francisco P. Moya",
    "Helen K. Rosenthal",
    "I. Daneek Miller",
    "Inez D. Barron",
    "James F. Gennaro",
    "James G. Van Bramer",
    "Joseph C. Borelli",
    "Justin L. Brannan",
    "Kalman Yeger ",
    "Karen Koslowitz",
    "Keith Powers ",
    "Kevin C. Riley",
    "Laurie A. Cumbo",
    "Margaret S. Chin",
    "Mark Gjonaj ",
    "Mark Levine",
    "Mark Treyger",
    "Mathieu Eugene",
    "Oswald Feliz",
    "Paul A. Vallone",
    "Peter A. Koo",
    "Public Advocate Jumaane Williams",
    "Rafael Salamanca, Jr.",
    "Robert E. Cornegy, Jr.",
    "Robert F. Holden",
    "Ruben Diaz, Sr.",
    "Selvena N. Brooks-Powers",
    "Stephen T. Levin",
    "Steven Matteo",
    "Vanessa L. Gibson",
    "Ydanis A. Rodriguez",
  ],
  datasets: [
    {
      label: "# of Bills Voted On",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: [
        32, 17, 29, 36, 10, 115, 16, 48, 61, 41, 19, 8, 120, 25, 18, 42, 6, 26,
        79, 22, 99, 79, 25, 29, 35, 38, 4, 41, 86, 36, 33, 62, 24, 47, 41, 22,
        17, 2, 10, 20, 17, 27, 301, 44, 58, 1, 24, 27, 2, 27, 16,
      ],
    },
  ],
};

const options = {
  indexAxis: "x",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
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
  render() {
    return (
      <div>
        <Bar data={state} options={options} />
      </div>
    );
  }
}
