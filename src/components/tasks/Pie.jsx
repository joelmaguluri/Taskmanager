import React, { Component } from "react";
import Chart from "chart.js";

export default class GraphChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount = () => {
    const ctx = this.ctx;
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Completed", "Incomplete"],
        datasets: [
          {
            data: [90, 10],
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
