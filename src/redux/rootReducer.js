import {combineReducers} from "redux";
import AuthenticationReducer from "./authentication";


const rootReducer = combineReducers({
  authentication: AuthenticationReducer,
});

export default rootReducer;
