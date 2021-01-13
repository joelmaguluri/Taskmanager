import React, { Component } from "react";
import styled from "styled-components";
import { database } from "../../app";
import Modal from "./Modal";
const Wrapper = styled.div`
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    -webkit-border-radius: 4px;
    border-radius: 4px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 10px;
    background: #c1dfff;
  }
`;
async function deletetask(id) {
  console.log("id", id);
  database
    .collection("taskboard")
    .doc(id)
    .delete();
}

const Task = ({ taskname, datecreated, taskid, completed, id }) => {
  console.log("taskid", taskid);
  return (
    <div className="todo-item all-todo-list p-3 border-bottom position-relative">
      <div className="inner-item d-flex align-items-start">
        <div className="w-100">
          {/* Checkbox */}
          <div className="custom-control custom-checkbox d-flex align-items-start">
            {completed ? (
              <input
                type="checkbox"
                className="custom-control-input"
                id={`checkbox${id}`}
                onChange={(e) => {
                  // updateState(!checked);
                }}
                checked
              />
            ) : (
              <input
                type="checkbox"
                className="custom-control-input"
                id={`checkbox${id}`}
                onChange={(e) => {
                  // updateState(!checked);
                }}
              />
            )}
            <label className="custom-control-label" htmlFor={`checkbox${id}`} />

            <div>
              <div className="content-todo">
                <h5
                  className="font-medium font-16 todo-header mb-0"
                  data-todo-header="Meeting with Mr.Jojo Sukla at 5.00PM"
                >
                  {completed ? <del>{taskname}</del> : taskname}
                </h5>
                <span className="todo-time font-12 text-muted">
                  <i className="icon-calender mr-1" />
                  {datecreated}
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <div className="todo-actions">
                <div
                  className="edit-todo todo-action mr-3"
                  style={{ display: "inline", cursor: "pointer" }}
                >
                  <i
                    class="fas fa-edit"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  ></i>
                </div>
                <div
                  class="delete-todo todo-action"
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={() => deletetask(taskid)}
                >
                  <i class="fas fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <Modal taskid={taskid} type={"edit"} />
    </div>
  );
};

export default class TaskTable extends Component {
  state = {
    taskboard: [],
    tasks: [],
  };
  componentDidMount = async () => {
    database.collection("taskboard").onSnapshot((snapshot) => {
      console.log("onSnapshot Called!");
      let updatedData = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      this.setState({ tasks: updatedData, taskboard: updatedData });
    });
  };
  searchtaskbyname = (e) => {
    // get the whole collection
    let { taskboard } = this.state;
    let inputtaskname = e.target.value;
    console.log("debugging");
    console.log(taskboard);
    let searchresult = taskboard.filter((task) =>
      task.data["taskname"]
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(inputtaskname.toLowerCase())
    );
    this.setState({ tasks: searchresult });
  };

  render() {
    const { tasks, taskboard } = this.state;
    console.log(taskboard);

    return (
      <div className="limiter">
        <div className="container">
          <div className="d-flex bd-highlight-md">
            <nav
              className="navbar navbar-light  justify-content-between"
              style={{ width: "100%" }}
            >
              <span className="login100-form-title">Tasks</span>
              <div class="form-inline">
                <input
                  className="form-control mr-sm-2 input100"
                  type="search"
                  placeholder="Search by Task Name"
                  aria-label="Search"
                  style={{ height: "42px", background: "white" }}
                  onChange={this.searchtaskbyname}
                />
                <button
                  class="btn btn-primary my-2 my-sm-0"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <i class="fa fa-plus mr-2" />
                  Add Task
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className="card-container mb-3">
          <div className="container">
            <div className="row d-flex">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Wrapper
                  style={{
                    padding: "20px",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)",
                    maxHeight: "400px",
                    overflow: "scroll",
                  }}
                >
                  <div className="p-3">
                    {tasks.map(({ data, id }, uniqueid) => {
                      const { taskname, datecreated, completed } = data;
                      console.log(id);
                      return (
                        <Task
                          taskname={taskname}
                          datecreated={datecreated}
                          id={uniqueid}
                          taskid={id}
                          completed={completed}
                        />
                      );
                    })}
                  </div>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
