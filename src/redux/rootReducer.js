import {combineReducers} from "redux";
import AuthenticationReducer from "./authentication";
import TasksReducer from "./Tasks";


const rootReducer = combineReducers({
  authentication: AuthenticationReducer,
  tasks:TasksReducer
});

export default rootReducer;
