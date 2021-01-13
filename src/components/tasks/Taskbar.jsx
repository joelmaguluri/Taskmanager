import React, { Component } from "react";
import "../login/utils.css";
import "../login/login.css";
import styled from "styled-components";

export default class Taskbar extends Component {
  render() {
    return (
      <>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
              <form
                className="login100-form validate-form"
                style={{ zIndex: "1000" }}
              >
                <span className="login100-form-title p-b-33 text-center">
                  You have no task.
                </span>
                <div className="container-login100-form-btn mt-20">
                  <button className="login100-form-btn">
                    <i class="fas fa-plus pr-2"></i>
                    New Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
