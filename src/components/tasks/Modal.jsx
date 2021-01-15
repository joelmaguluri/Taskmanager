import React from "react";
import styled from "styled-components";
import Button from "../widgets/Button";
import Input from "../widgets/Input";

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
  const { type, show, closeModal } = props;
  var onSubmitHandler;
  if (type === "edit")
    onSubmitHandler = (e) => {
      props.updateTaskName(e, props.taskname, props.time);
    };
  else {
    onSubmitHandler = (e) => {
      props.createNewTask(e);
    };
  }
  return (
    <ModalWrapper display={show}>
      <section className="modal-main">
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div
            className="modal-content"
            style={{
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 20px 0px",
              width: "100%",
            }}
          >
            <div className="modal-header" style={{ borderBottom: "0px" }}>
              <h5 className="modal-title">
                {type === "edit" ? "Update Task" : "New Task"}
              </h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div>
                <div className="content">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                          <div className="col-md-12">
                            <div className="form-block">
                              <form onSubmit={onSubmitHandler}>
                                <Input
                                  type="text"
                                  name="task"
                                  placeholder="taskname"
                                />

                                <Button
                                  type="submit"
                                  className="btn btn-block btn-primary mt-4"
                                >
                                  {type === "edit" ? "Update Task" : "New Task"}
                                </Button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <form className="login100-form" onSubmit={onSubmitHandler}>
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ModalWrapper>
  );
};

export default Modal;
