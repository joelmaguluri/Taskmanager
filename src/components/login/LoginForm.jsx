import React from "react";
import { SETUSER } from "../../redux/constants";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./login.css";
import "./utils.css";

async function getUserAsync(formData) {
  let response = await fetch(
    "http://localhost:5001/tdcx-dashboard-28b8f/us-central1/webApp/authenticate",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    }
  );
  response = await response.json();
  console.log(response);
  return response;
}

const handleSubmit = async (setuser, e, history) => {
  e.preventDefault();
  let formData = JSON.stringify({
    Id: e.target["Id"].value,
    name: e.target["name"].value,
  });
  let response = await getUserAsync(formData);
  if (response.success) {
    setuser(response.user);
    history.push("/dashboard");
  }
};

const LoginForm = ({ setuser, history, authenticated }) => {
  return authenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <form
            className="login100-form validate-form"
            onSubmit={(e) => {
              handleSubmit(setuser, e, history);
            }}
          >
            <span className="login100-form-title p-b-33 text-left">Login</span>
            <div
              className="wrap-input100 validate-input mb-4"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="Id"
                placeholder="Id"
              />
            </div>
            <div
              className="wrap-input100 rs1 validate-input mb-4"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="name"
              />
            </div>
            <div className="container-login100-form-btn mt-20">
              <button className="login100-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  console.log(state);
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
