import React, { Component, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { database } from "../../app";
import { createNewTask, retrievetasks, updateTaskName } from "../../api/api";
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

const Task = ({
  taskname,
  time,
  completed,
  completedtasks,
  totaltasks,
  uid,
  deleteTask,
  datecreated,
  updateTaskName,
}) => {
  const [state, updateState] = useState({ show: false, checked: completed });
  return (
    <div className="todo-item all-todo-list p-3 border-bottom position-relative">
      <div className="inner-item d-flex align-items-start">
        <div className="w-100">
          {/* Checkbox */}
          <div className="custom-control custom-checkbox d-flex align-items-start">
            <input
              type="checkbox"
              className="custom-control-input"
              id={`checkbox-${time}`}
              checked={state.checked}
            />

            <label
              className="custom-control-label"
              htmlFor={`checkbox-${time}`}
            />

            <div>
              <div className="content-todo">
                <h5 className="font-medium font-16 todo-header mb-0">
                  {taskname}
                </h5>
                <span className="todo-time font-12 text-muted">
                  {datecreated}
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <div className="todo-actions">
                <div
                  className="edit-todo todo-action mr-3"
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={() =>
                    updateState((state) => ({
                      show: !state.show,
                      checked: state.checked,
                    }))
                  }
                >
                  <i class="fas fa-edit"></i>
                </div>
                <div
                  class="delete-todo todo-action"
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={() =>
                    deleteTask(
                      taskname,
                      time,
                      completed,
                      completedtasks,
                      totaltasks,
                      uid
                    )
                  }
                >
                  <i class="fas fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        type={"edit"}
        show={state.show}
        closeModal={() =>
          updateState((state) => ({
            show: !state.show,
            checked: state.checked,
          }))
        }
        uid={uid}
        taskname={taskname}
        updateTaskName={updateTaskName}
        time={time}
      />
    </div>
  );
};

class TaskTable extends Component {
  state = { displaymodal: false, tasks: [] };

  componentDidMount = async () => {
    const { settasks, uid } = this.props;
    let taskboard = await database.collection("taskboard").get();
    taskboard = taskboard.docs;
    taskboard = taskboard.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    let taskssinfo = await database.collection("users").doc(uid);
    taskssinfo = await (await taskssinfo.get()).data();
    const { completedtasks, totaltasks } = taskssinfo;
    await settasks(taskboard, { completedtasks, totaltasks });

    this.setState({ tasks: taskboard });
  };

  searchtaskbyname = (e) => {
    // get the whole collection
    let { taskboard } = this.props;
    let inputtaskname = e.target.value;
    let searchresult = taskboard.filter((task) =>
      task.data["taskname"]
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(inputtaskname.toLowerCase())
    );
    this.setState({ tasks: searchresult });
  };
  render() {
    const { tasks, displaymodal } = this.state;
    const {
      uid,
      taskboard,
      totaltasks,
      createNewTask,
      deleteTask,
      updateTaskName,
    } = this.props;
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
                  onClick={() => this.setState({ displaymodal: !displaymodal })}
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
                    {tasks.map(({ data, id }) => {
                      const { taskname, datecreated, completed, time } = data;
                      return (
                        <Task
                          taskname={taskname}
                          datecreated={datecreated}
                          taskid={id}
                          completed={completed}
                          uid={uid}
                          deleteTask={deleteTask}
                          time={time}
                          updateTaskName={updateTaskName}
                        />
                      );
                    })}
                    <Modal
                      show={displaymodal}
                      type="new"
                      closeModal={() =>
                        this.setState({ displaymodal: !displaymodal })
                      }
                      uid={uid}
                      totaltasks={totaltasks}
                      createNewTask={createNewTask}
                    />
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

let mapStateToProps = (state) => {
  let { taskboard, completedtasks, totaltasks } = state.tasks;
  return {
    taskboard: taskboard,
    completedtasks: completedtasks,
    totaltasks: totaltasks,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    settasks: (taskboard, taskinfo) =>
      retrievetasks(taskboard, taskinfo, dispatch),
    updateTaskName: (e, taskname, time) =>
      updateTaskName(e, taskname, time, dispatch),
    createNewTask: (e) => createNewTask(e, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
