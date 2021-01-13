import React, { Component } from "react";
import GraphChart from "./Pie";

export default class Cards extends Component {
  state = {
    completedtasks: 0,
    totaltasks: 0,
  };
  render() {
    return (
      <div className="card-container mb-3">
        <div className="container">
          <div className="row d-flex">
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
              <div
                style={{
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
                  minHeight: "300px",
                }}
              >
                <div
                  className="email-ctn-round"
                  style={{ textAlign: "center" }}
                >
                  <div
                    className="email-rdn-hd"
                    style={{ marginBottom: "20px", width: "100%" }}
                  >
                    <h2 style={{ float: "left" }}>New Tasks</h2>
                  </div>
                </div>
                <div className="email-statis-wrap ">
                  <div className="email-round-nock">
                    <div
                      style={{
                        width: "130px",
                        height: "200px",
                      }}
                    >
                      <span
                        className="login100-form-title h1"
                        style={{ fontSize: "100px" }}
                      >
                        18<h4 style={{ display: "inline" }}>/20</h4>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
              <div
                style={{
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
                  minHeight: "300px",
                }}
              >
                <div
                  className="email-ctn-round mb-1"
                  style={{ textAlign: "center" }}
                >
                  <div
                    className="email-rdn-hd"
                    style={{ marginBottom: "20px", width: "100%" }}
                  >
                    <h2 style={{ float: "left" }}>Latest Created Tasks</h2>
                  </div>
                </div>
                <div className="recent-post-items pt-5">
                  <div className="recent-post-signle rct-pt-mg-wp">
                    <a href="#">
                      <div className="recent-post-flex">
                        <div className="recent-post-it-ctn">
                          <p>
                            Nunc quis diam diamurabitur at dolor elementum,
                            dictum turpis vel
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="recent-post-signle">
                    <a href="#">
                      <div className="recent-post-flex rct-pt-mg">
                        <div className="recent-post-it-ctn">
                          <p>
                            Nunc quis diam diamurabitur at dolor elementum,
                            dictum turpis vel
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="recent-post-signle rct-pt-mg-wp">
                    <a href="#">
                      <div className="recent-post-flex">
                        <div className="recent-post-it-ctn">
                          <p>
                            Nunc quis diam diamurabitur at dolor elementum,
                            dictum turpis vel
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
              <div
                className="align-items-center"
                style={{
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
                  minHeight: "300px",
                }}
              >
                <div className="email-statis-wrap ">
                  <div className="email-round-nock">
                    <div
                      style={{
                        display: "inline",
                        width: "500px",
                        height: "300px",
                      }}
                    >
                      <GraphChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
