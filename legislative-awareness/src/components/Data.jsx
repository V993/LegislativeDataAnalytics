import React from "react"
import { BarChart } from "./Bar"

function Data() {
    return (
        <div className="data">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-5">
                        <h1 class="font-weight-light">
                            Data Stuff
                        </h1>
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data;