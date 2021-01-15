import React from "react";
import { SETUSER } from "../../redux/constants";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../widgets/Input";
import Button from "../widgets/Button";
import styled from "styled-components";
import { database } from "../../app";

const Wrapper = styled.div`
  padding: 8rem 0;
`;
const FormWrapper = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 20px 0px;
`;

const AuthenticateUser = async (setuser, e, history) => {
  e.preventDefault();
  let Id = e.target["Id"].value;
  let username = e.target["name"].value;
  let response = await database
    .collection("users")
    .where("Id", "==", Id)
    .where("name", "==", username)
    .get();
  console.log(response);
  await response.docs.forEach((doc) => {
    setuser({ ...doc.data(), uid: doc.id });
  });

  if (response.success) {
    setuser(response.user);
    history.push("/dashboard");
  }
};

const LoginForm = ({ setuser, history, authenticated }) => {
  return authenticated ? (
    <Redirect to="/dashboard" /> // if user is authenticated redirecting him to /dashboard
  ) : (
    // displaying loginform if not authenticated
    <Wrapper className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 contents">
            <FormWrapper className="row justify-content-center">
              <div className="col-md-12 p-5 m-5">
                <div className="form-block">
                  <div className="mb-4">
                    <h3>
                      <strong>Login</strong>
                    </h3>
                  </div>
                  <form
                    onSubmit={(e) => {
                      AuthenticateUser(setuser, e, history);
                    }}
                  >
                    <Input type="text" name="Id" placeholder="Id" />
                    <Input type="password" name="name" placeholder="name" />

                    <Button
                      type="submit"
                      className="btn btn-block btn-primary mt-4"
                    >
                      Log In
                    </Button>
                  </form>
                </div>
              </div>
            </FormWrapper>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

let mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setuser: (payload) => dispatch({ type: SETUSER, payload: payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
