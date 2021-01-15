import React, { Component } from "react";
import { Chart } from "react-google-charts";

export default class PieChart extends Component {
  render() {
    const { completedtasks, totaltasks } = this.props;
    return (
      <Chart
        width={"300px"}
        height={"200px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Tasks", "Total"],
          ["Completed", completedtasks],
          ["Incomplete", totaltasks - completedtasks],
        ]}
        options={{
          legend: "none",
          pieSliceText: "label",
          pieStartAngle: 100,
        }}
        rootProps={{ "data-testid": "4" }}
      />
    );
  }
}
