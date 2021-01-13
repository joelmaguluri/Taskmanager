import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import Cards from "../components/tasks/Cards";
import { connect } from "react-redux";
import { LOGOUT } from "../redux/constants";
import { Redirect } from "react-router-dom";
import TaskTable from "../components/tasks/TaskTable";

class Dashboard extends Component {
  render() {
    const { user, authenticated, logout, history } = this.props;
    return authenticated ? (
      <div>
        <Navbar user={user} logout={logout} history={history} />
        <Cards uid={user.uid} />
        <TaskTable uid={user.uid} />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

let mapStateToProps = (state) => {
  let { user, authenticated } = state.authentication;
  return { user, authenticated };
};

let mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
