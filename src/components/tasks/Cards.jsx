import React, { Component } from "react";
import styled from "styled-components";
import { database } from "../../app";
import { CardListItem, CardTitle, UnorderedList } from "../widgets/Typography";
import PieChart from "./Pie";

const TaskDisplay = styled.span`
  font-size: 100px;
  color: rgb(35 154 255);
`;
const TaskDisplayMini = styled.h4`
  display: inline;
  font-size: 30px;
  color: #b0b0b0;
`;

const CardWrapper = styled.div`
  padding: 20px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 20px 0px;
  min-height: 300px;
  max-height: 300px;
  min-width: 300px;
  border: 0;
  width: 100%;
  overflow: hidden;
`;

const RecentTask = ({ taskname, completed }) => {
  console.log("taskname", taskname, completed);
  return (
    <li>
      <div className=" text-left ml-3" style={{ overflow: "hidden" }}>
        <div>
          <CardListItem>
            {completed ? <del>{taskname}</del> : taskname}
          </CardListItem>
        </div>
      </div>
    </li>
  );
};
export default class Cards extends Component {
  state = {
    recenttasks: [],
  };
  getTasks = async () => {
    let taskboard = await database.collection("taskboard").get();
    taskboard = taskboard.docs;
    taskboard = taskboard.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    this.setState({
      recenttasks: taskboard,
    });
  };
  componentDidMount = async () => {
    this.getTasks();
    /*attaching listener which responds to database 
    updation events and updates component state*/
    database.collection("taskboard").onSnapshot(async (snapshot) => {
      this.getTasks();
    });
  };

  render() {
    const { completedtasks, totaltasks } = this.props;
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="container-fluid mb-4">
            <div className="row justify-content-around">
              {/* Card 1 : Task Information (Completed , Total Tasks) */}
              <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <CardWrapper>
                  <div className="card-body">
                    <div className="d-flex flex-row mb-3">
                      <div className="text-left" style={{ width: "100%" }}>
                        <CardTitle>New Tasks</CardTitle>
                      </div>
                    </div>
                    <div className="d-flex flex-row">
                      <div className="text-left" style={{ width: "100%" }}>
                        <TaskDisplay>
                          {completedtasks}
                          <TaskDisplayMini>/{totaltasks}</TaskDisplayMini>
                        </TaskDisplay>
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>

              {/*card2 :   Recent Tasks*/}
              <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <CardWrapper>
                  <div className="card-body">
                    <div className="d-flex flex-row mb-3">
                      <div className="text-left" style={{ width: "100%" }}>
                        <CardTitle>Recent Tasks</CardTitle>
                      </div>
                    </div>
                    <div className="d-flex flex-row">
                      <div className="text-left" style={{ width: "100%" }}>
                        <UnorderedList>
                          {this.state.recenttasks.map(({ data, id }) => {
                            const { taskname, completed } = data;

                            return (
                              <RecentTask
                                taskname={taskname}
                                completed={completed}
                                id={id}
                              />
                            );
                          })}
                        </UnorderedList>
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>

              {/*card3 :   Visualization of Tasks (Pie Chart)*/}
              <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <CardWrapper>
                  <div className="card-body">
                    <div className="d-flex flex-row justify-content-center">
                      <div>
                        <PieChart
                          uid={this.props.uid}
                          completedtasks={completedtasks}
                          totaltasks={totaltasks}
                          style={{ position: "relative" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
