import React from "react";
import { BarChart } from "./Bar";
import Bills from "./Bills";
import Committees from "./Committees";
import Proximity from "./Proximity"

export default class DataNavigation extends React.Component {
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

  render() {
    return (
      <div>
        <button>
          Bills Sponsored by a Representative
        </button>
        <button>
          Bills Considered by a Committee
        </button>
        <button>
          Voting Proximity Between Representatives
        </button>
      </div>
    );
  }
}
