import React, { Component } from "react";
import { database } from "../../app";
import GraphChart from "./Pie";

const SortedTask = ({ taskname, completed }) => {
  console.log(taskname);
  return (
    <div className="recent-post-signle rct-pt-mg-wp">
      <a href="#">
        <div className="recent-post-flex">
          <div className="recent-post-it-ctn">
            <p>{completed ? <del>{taskname}</del> : { taskname }}</p>
          </div>
        </div>
      </a>
    </div>
  );
};
export default class Cards extends Component {
  state = {
    completedtasks: 0,
    totaltasks: 0,
    sortedtasks: [],
  };
  componentDidMount = () => {
    const { uid } = this.props;

    database.collection("users").onSnapshot(async (snapshot) => {
      let userinfo = await database
        .collection("users")
        .doc(uid)
        .get();
      userinfo = userinfo.data();

      this.setState({
        completedtasks: userinfo.completedtasks,
        totaltasks: userinfo.totaltasks,
      });
    });
  };

  render() {
    const { completedtasks, totaltasks, sortedtasks } = this.state;
    console.log("sorted", sortedtasks);
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
                        {completedtasks}
                        <h4 style={{ display: "inline" }}>/{totaltasks}</h4>
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
                  {/* {sortedtasks.map((info) => {
                    console.log("data", info);
                    return (
                      <>
                        <h1>Sudep</h1>
                        <SortedTask
                          taskname={info.data.taskname}
                          completed={info.data.completed}
                        />
                      </>
                    );
                  })} */}
                  {sortedtasks.map(({ data, id }) => {
                    const { taskname, completed } = data;
                    return (
                      <SortedTask
                        taskname={taskname}
                        completed={completed}
                        id={id}
                      />
                    );
                  })}
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
                      <GraphChart
                        completedtasks={completedtasks}
                        totaltasks={totaltasks}
                      />
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
