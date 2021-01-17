import React, { Component, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { database } from "../../app";
import Input from "../widgets/Input";
import { CardTitle } from "../widgets/Typography";
import Modal from "./Modal";

const Wrapper = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow: scroll;
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
  uid,
  deleteTask,
  datecreated,
  updateTaskName,
  togglecheckboxState,
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
              onClick={() => {
                togglecheckboxState(state.checked, taskname, time);
                updateState((state) => ({
                  checked: !state.checked,
                }));
              }}
            />

            <label
              className="custom-control-label"
              htmlFor={`checkbox-${time}`}
            />

            <div>
              <div className="content-todo">
                <h5 className="font-medium font-16 todo-header mb-0">
                  {state.checked ? <del>taskname</del> : { taskname }}
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
                  onClick={async () => {
                    updateState((state) => ({
                      show: !state.show,
                      checked: state.checked,
                    }));
                  }}
                >
                  <i class="fas fa-edit"></i>
                </div>
                <div
                  class="delete-todo todo-action"
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteTask(taskname, time, completed);
                  }}
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
  state = {
    displaymodal: false,
    tasks: [],
    taskboard: [],
  };

  componentDidMount = async () => {
    console.log("called");
    //updating the component with tasks after retrieving from database
    let taskboard = await database.collection("taskboard").get();
    taskboard = await taskboard.docs;
    taskboard = taskboard.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    await this.setState({
      taskboard: taskboard,
      tasks: taskboard,
    });
  };

  searchtaskbyname = (e) => {
    /*filters the tasks based on the search*/
    let { taskboard } = this.state;
    let inputtaskname = e.target.value;

    //compare the tasks which matches input task and display them
    let searchresult = taskboard.filter((task) =>
      task.data["taskname"]
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(inputtaskname.toLowerCase())
    );

    this.setState({ tasks: searchresult });
  };

  createNewTask = async (e) => {
    /* creates new task updates the component state 
    and store the new task in database*/
    e.preventDefault();
    const { uid, updateTaskInfo, completedtasks, totaltasks } = this.props;
    let { taskboard } = this.state;
    let date = new Date();
    let taskname = e.target["task"].value;

    const data = {
      taskname: taskname,
      completed: false,
      datecreated: date.toDateString(),
      time: date.getTime(),
    };

    await database.collection("taskboard").add(data);
    taskboard = [...taskboard, { data: data, id: data.time }];

    await this.setState({
      taskboard: taskboard,
      tasks: taskboard,
    });

    //Incrementing total tasks field of user document in database
    database
      .collection("users")
      .doc(uid)
      .set(
        {
          completedtasks: completedtasks,
          totaltasks: totaltasks + 1,
        },
        { merge: true }
      )
      .then((response) => console.log(response))
      .catch((e) => console.log(e));

    //setting the component state with new task

    // dispatch method to modify store with new values
    updateTaskInfo({
      completedtasks: completedtasks,
      totaltasks: totaltasks + 1,
    });
  };

  updateTaskName = (e, taskname, time) => {
    /*Updates state with new task name and also collection*/
    e.preventDefault();
    let newtaskname = e.target["task"].value;
    let { taskboard } = this.state;

    //mapping through the tasks to find the relavent task and updating name
    taskboard = taskboard.map((task) => {
      const { data, id } = task;
      if (data.taskname === taskname && data.time === time) {
        data.taskname = newtaskname;
        return {
          data: data,
          id: id,
        };
      }
      return task;
    });

    this.setState({
      taskboard: taskboard,
    });
  };

  deleteTask = async (taskname, time, completed) => {
    /* Deletes the task from the component state and also from the database*/

    let { taskboard } = this.state;
    const { uid, updateTaskInfo, completedtasks, totaltasks } = this.props;

    //filtering tasks to find the relevant task and to delete it
    let updatedData = [];
    taskboard.forEach((task) => {
      let data = task.data;
      if (data.taskname === taskname && data.time === time);
      else updatedData.push(task);
    });

    // checking for relevant task in the database and deleting it
    database
      .collection("taskboard")
      .where("taskname", "==", taskname)
      .where("time", "==", time)
      .get()
      .then((data) => {
        data = data.docs;
        data.forEach(({ id }) => {
          database
            .collection("taskboard")
            .doc(id)
            .delete();
        });
      });

    //updating users collection
    database
      .collection("users")
      .doc(uid)
      .update({
        completedtasks: completed ? completedtasks - 1 : completedtasks,
        totaltasks: totaltasks - 1,
      });

    updateTaskInfo({
      completedtasks: completed ? completedtasks - 1 : completedtasks,
      totaltasks: totaltasks - 1,
    });
    await this.setState({
      taskboard: updatedData,
      tasks: updatedData,
    });
  };

  togglecheckboxState = (checked, taskname, time) => {
    /* marks task as complete or incomplete*/

    const { uid, updateTaskInfo, completedtasks } = this.props;
    let { taskboard } = this.state;

    // marking completed or incomplete based on the input
    taskboard = taskboard.map((task) => {
      const { data, id } = task;
      if (data.taskname === taskname && data.time === time) {
        data.completed = !checked;
        return {
          data: data,
          id: id,
        };
      }
      return task;
    });

    //updating the taskstate in the database
    database
      .collection("taskboard")
      .where("taskname", "==", taskname)
      .where("time", "==", time)
      .get()
      .then(async (data) => {
        data = data.docs;
        data.forEach(({ id }) => {
          database
            .collection("taskboard")
            .doc(id)
            .set({ completed: !checked }, { merge: true });
        });
      });

    database
      .collection("users")
      .doc(uid)
      .set(
        {
          completedtasks: !checked ? completedtasks + 1 : completedtasks - 1,
        },
        { merge: true }
      );

    updateTaskInfo({
      completedtasks: !checked ? completedtasks + 1 : completedtasks - 1,
    });
    this.setState({
      taskboard: taskboard,
    });
  };

  render() {
    console.log(this.state);
    const { tasks, displaymodal } = this.state;
    return (
      <div className="limiter">
        <div className="container">
          <div className="card-container ml-4">
            <div className="container">
              <div className="d-flex flex-sm-column flex-md-row justify-content-md-between">
                <div className="text-left ml-3">
                  <CardTitle>Tasks</CardTitle>
                </div>
                <div className="d-flex flex-sm-column flex-md-row align-self-md-end">
                  <Input
                    onChange={this.searchtaskbyname}
                    type="search"
                    placeholder="Search by Task Name"
                  />
                  <button
                    type="submit"
                    className="btn btn-block btn-primary mb-3"
                    style={{ height: "50px" }}
                    onClick={() =>
                      this.setState({ displaymodal: !displaymodal })
                    }
                  >
                    <i class="fa fa-plus mr-2" />
                    Add Task
                  </button>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Wrapper>
                    <div className="p-3">
                      {tasks.map(({ data, id }) => {
                        const { taskname, datecreated, completed, time } = data;
                        return (
                          <Task
                            taskname={taskname}
                            datecreated={datecreated}
                            taskid={id}
                            completed={completed}
                            time={time}
                            updateTaskName={this.updateTaskName}
                            deleteTask={this.deleteTask}
                            togglecheckboxState={this.togglecheckboxState}
                          />
                        );
                      })}
                      <Modal
                        show={displaymodal}
                        type="new"
                        closeModal={() =>
                          this.setState({ displaymodal: !displaymodal })
                        }
                        createNewTask={this.createNewTask}
                      />
                    </div>
                  </Wrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  let { user } = state.authentication;
  return {
    completedtasks: user.completedtasks,
    totaltasks: user.totaltasks,
    uid: user.uid,
  };
};

export default connect(mapStateToProps, null)(TaskTable);
