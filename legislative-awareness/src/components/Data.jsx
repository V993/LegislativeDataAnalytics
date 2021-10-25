import React from "react";
import { BarChart } from "./Bar";
import Bills from "./Bills";

function Data() {
  return (
    <div className="data">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-12">
            <h1 class="font-weight-light">Representatives' Data</h1>
            <Bills />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;
