
import { LOGOUT, SETUSER } from "./constants";

const initialState = {authenticated: false, user:null};

const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETUSER:
        return {user:{...action.payload},authenticated:'true'};
    case LOGOUT:
        return {user:null,authenticated:false};
    
    default:
      return {...state};
  }
};

export default AuthenticationReducer;