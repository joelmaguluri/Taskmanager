import React, { useState } from "react";
import { database } from "../../app";
import Button from "../widgets/Button";
import Modal from "./Modal";

const storeFirstTask = async (e, uid) => {
  e.preventDefault();
  let date = new Date();
  let taskname = e.target["task"].value;
  const data = {
    taskname: taskname,
    completed: false,
    datecreated: date.toDateString(),
    time: date.getTime(),
  };
  await database.collection("taskboard").add(data);
  await database
    .collection("users")
    .doc(uid)
    .set(
      {
        completedtasks: 0,
        totaltasks: 1,
      },
      { merge: true }
    );
};
const NoTasks = (props) => {
  const [show, updateState] = useState(0);
  return (
    <div className="content" style={{ padding: " 10rem 0" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 contents">
            <div
              className="row justify-content-center"
              style={{
                background: "white",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 20px 0px",
              }}
            >
              <div className="col-md-12 p-5 m-5">
                <div className="form-block">
                  <div className="mb-4 text-center">
                    <h3>
                      <strong>You Have No Tasks</strong>
                    </h3>
                  </div>

                  <Button
                    type="submit"
                    className="btn btn-block btn-primary mt-4"
                    onClick={(e) => {
                      updateState(!show);
                    }}
                  >
                    New Task
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        type={"new"}
        show={show}
        closeModal={() => updateState(!show)}
        createNewTask={(e) => {
          storeFirstTask(e, props.uid, props.history);
          props.updateTaskInfo({ completedtasks: 0, totaltasks: 1 });
        }}
      />
    </div>
  );
};

export default NoTasks;
