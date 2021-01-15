
import { LOGOUT, SETUSER, UPDATETASKINFO } from "./constants";

const initialState = {authenticated: false, user:null};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETUSER:// set the user data in store if authentication was successful
        return {user:{...action.payload},authenticated:'true'};
    case UPDATETASKINFO: // updating taskinfo i.e completed tasks and total tasks
          return {...state,user:{...state.user,...action.payload}};
    case LOGOUT: // remove user data from store
        return {user:null,authenticated:false};
    
    default:
      return {...state};
  }
};

export default UserReducer;