import React from "react";

import "./login.css";
import "./utils.css";

const NoTasks = (props) => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33 text-center">
            You Have No Task
          </span>
          <div className="container-login100-form-btn mt-20">
            <button className="login100-form-btn">New Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoTasks;
