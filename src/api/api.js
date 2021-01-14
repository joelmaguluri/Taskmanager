import { database } from "../app";
import { CREATENEWTASK, STORETASKS, UPDATETASKNAME } from "../redux/constants";

export const retrievetasks= (taskboard, taskinfo,dispatch) => {
    dispatch({
      type: STORETASKS,
      payload: { taskboard: taskboard, ...taskinfo },
    });
  }

export const updateTaskName= async (e, taskname, time,dispatch) => {
    let newtaskname = e.target["task"].value;
    await dispatch({
      type: UPDATETASKNAME,
      payload: {
        taskname: taskname,
        time: time,
        newtaskname: newtaskname,
      },
    });
    database
      .collection("taskboard")
      .where("taskname", "==", taskname)
      .where("time", "==", time)
      .get()
      .then(async (data) => {
        data = data.docs;
        data.forEach((data) => {
          database
            .collection("taskboard")
            .doc(data.id)
            .update({ taskname: newtaskname }, { merge: true });
        });
      });
  }
  export const createNewTask= async (e,dispatch) => {
    e.preventDefault();
    let date = new Date();
    let taskname = e.target["task"].value;
    const data={
        taskname:taskname,
        completed:false,
        datecreated:date.toDateString(),
        time:date.getTime(),
    }
    await dispatch(
        {
        type:CREATENEWTASK,
        payload:{
            data:data,
            id:data.time
        }
        }
    )
    database.collection("taskboard").add(data);

  }