import React, { Component } from "react";
import Chart from "chart.js";

export default class GraphChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount = () => {
    const { completedtasks, totaltasks } = this.props;
    let a = totaltasks - completedtasks;
    var dataArray;
    if (a == 0) dataArray = [100, 0];
    else if (a > completedtasks) dataArray = [a, completedtasks];
    else dataArray = [completedtasks, a];

    const ctx = this.ctx;
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Incomplete", "Completed"],
        datasets: [
          {
            data: dataArray,
            backgroundColor: ["#c1dfff", "#f6f6f6"],
          },
        ],
      },
    });
  };
  render() {
    return (
      <div>
        <canvas width="800" height="600" ref={(ctx) => (this.ctx = ctx)} />
      </div>
    );
  }
}
