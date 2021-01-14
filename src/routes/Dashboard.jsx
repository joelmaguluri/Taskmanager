import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import Cards from "../components/tasks/Cards";
import { connect } from "react-redux";
import { ERASETASKBOARD, LOGOUT, STORETASKS } from "../redux/constants";
import { Redirect } from "react-router-dom";
import TaskTable from "../components/tasks/TaskTable";
import NoTasks from "../components/tasks/NoTasks";
import { database } from "../app";

class Dashboard extends Component {
  state = {
    loading: true,
  };
  componentDidMount = async () => {
    this.setState({ loading: false });
  };
  render() {
    const { user, authenticated, logout, history } = this.props;
    const { loading } = this.state;

    return authenticated ? (
      <div>
        <Navbar user={user} logout={logout} history={history} />
        {loading ? (
          <></>
        ) : (
          <>
            <>
              <Cards uid={user.uid} />
              <TaskTable uid={user.uid} />
            </>
          </>
        )}
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
    logout: async () => {
      await dispatch({ type: LOGOUT });
      await dispatch({ type: ERASETASKBOARD });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
