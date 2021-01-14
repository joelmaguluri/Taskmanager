
import { DELETETASK,  ERASETASKBOARD,  STORETASKS,CREATENEWTASK, UPDATETASKNAME } from "./constants";

const initialState = {taskboard: [], totaltasks:0,completedtasks:0};

const TasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORETASKS:
        {
          return {...action.payload}
        }
    case CREATENEWTASK:
          {
            const {totaltasks}=state;
            let taskboard=[...state.taskboard];
            console.log(totaltasks,[...taskboard,{...action.payload}])
          return {
            ...state,taskboard:taskboard,totaltasks:totaltasks+1
          }

            }
    case DELETETASK:
        {
            let taskboard=[...state.taskboard].filter(task=>task.taskname!==action.payload.taskname&&task.time!==action.payload.time);   
            let {completedtasks,totaltasks}=action.payload;
            let isCompleted=action.payload.completed;
            if(isCompleted)
              return {taskboard:taskboard,completedtasks:completedtasks-1,totaltasks:totaltasks-1};
            else 
              return {...state,taskboard:taskboard,totaltasks:totaltasks-1};
        }
    case ERASETASKBOARD:
      return {taskboard: [], totaltasks:0,completedtasks:0}
    case UPDATETASKNAME:
      {
          const{taskname,newtaskname,time}=action.payload;
          let taskboard=state.taskboard;
          taskboard=taskboard.map((task)=>{
            const {data,id}=task;
            if(data.taskname===taskname&&data.time===time)
              {
                data.taskname=newtaskname;
                return {
                  data:data,
                  id:id
                }
            }
            return task;   
          })
  
        return {...state,taskboard:taskboard}
    }
    default:
      return {...state};
  }
};

export default TasksReducer;