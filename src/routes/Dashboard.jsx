import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import Cards from "../components/tasks/Cards";
import { connect } from "react-redux";
import { LOGOUT, UPDATETASKINFO } from "../redux/constants";
import { Redirect } from "react-router-dom";
import TaskTable from "../components/tasks/TaskTable";
import NoTasks from "../components/tasks/NoTasks";

class Dashboard extends Component {
  render() {
    const { user, authenticated, logout, history, updateTaskInfo } = this.props;
    if (authenticated)
      return (
        <div>
          <Navbar user={user} logout={logout} history={history} />
          {user.totaltasks ? (
            <>
              {/* component with three cards 1.totaltask and completed 2. recenttasks 3.Visualization of tasks */}
              <Cards
                completedtasks={user.completedtasks}
                totaltasks={user.totaltasks}
              />
              {/*component consisting of all the list of tasks */}
              <TaskTable
                uid={user.uid}
                completedtasks={user.completedtasks}
                totaltasks={user.totaltasks}
                updateTaskInfo={updateTaskInfo}
              />
            </>
          ) : (
            <NoTasks //component to be displayed when user has no tasks
              uid={user.uid}
              history={history}
              updateTaskInfo={updateTaskInfo}
            />
          )}
        </div>
      );
    else {
      return <Redirect to="/" />;
    }
  }
}

let mapStateToProps = (state) => {
  let { user, authenticated } = state.authentication;
  return { user, authenticated };
};

let mapDispatchToProps = (dispatch) => {
  return {
    logout: async () => {
      await dispatch({ type: LOGOUT }); // removes all the user info from store
    },
    updateTaskInfo: (payload) => {
      dispatch({ type: UPDATETASKINFO, payload: payload });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
