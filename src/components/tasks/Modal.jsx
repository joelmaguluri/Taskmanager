import React from "react";
import styled from "styled-components";
import { database } from "../../app";

const storeDataToFirebase = async (e, uid) => {
  e.preventDefault();
  let date = new Date();
  let taskname = e.target["task"].value;
  await database.collection("taskboard").add({
    taskname,
    datecreated: date.toDateString(),
    time: date.getTime(),
    completed: false,
  });
  let tasksinfo = database.collection("users").doc(uid);
  console.log(tasksinfo, "taskinfo");

  if (tasksinfo.totaltasks == null)
    database
      .collection("users")
      .doc(uid)
      .set({ completedtasks: 0, totaltasks: 1 }, { merge: true });
  else
    database
      .collection("users")
      .doc(uid)
      .set(
        {
          completedtasks: tasksinfo.completedtasks,
          totaltasks: tasksinfo.totaltasks + 1,
        },
        { merge: true }
      );
};

const updateTaskInfo = async (e, taskid) => {
  let newtaskname = e.target["task"].value;
  e.preventDefault();
  database
    .collection("taskboard")
    .doc(taskid)
    .set(
      {
        taskname: newtaskname,
      },
      { merge: true }
    );
};

let ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
  display: ${(props) => (props.display ? "block" : "none")};
  transition-property: display;
  transition:3s ease-in-out;
  };
  .modal-main {
    position: fixed;
    width: 80%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
`;

const Modal = (props) => {
  const { type, show, onClick } = props;
  console.log(type, show, onClick);
  return (
    <ModalWrapper display={show}>
      <section className="modal-main">
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <div className="modal-header" style={{ borderBottom: "0px" }}>
              <h5 className="modal-title">
                {type === "edit" ? "Update Task" : "New Task"}
              </h5>
              <button type="button" className="close" onClick={onClick}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div>
                <form
                  className="login100-form"
                  onSubmit={
                    type === "edit"
                      ? (e) => updateTaskInfo(e, props.taskid)
                      : (e) => storeDataToFirebase(e, props.uid)
                  }
                >
                  <div className="form-group">
                    <div className="wrap-input100 validate-input mb-4">
                      <input
                        className="input100"
                        type="text"
                        name="task"
                        placeholder="taskname"
                        autofocus
                      />
                    </div>

                    <div className="container-login100-form-btn mt-20">
                      <button
                        className="login100-form-btn btn btn-primary"
                        type="submit"
                      >
                        {type === "edit" ? "Update Task" : "New Task"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ModalWrapper>
  );
};

export default Modal;
