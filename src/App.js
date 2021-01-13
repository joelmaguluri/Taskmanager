import React from "react";
import {createBrowserHistory} from "history";
import {Route, Router} from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Login from "./components/login/LoginForm";
import firebase from 'firebase'
import firebaseConfig from './components/firebaseconfig';

firebase.initializeApp(firebaseConfig);

const history = createBrowserHistory();

const App = () => {
  return(
    <Router history={history}>
    <Route path='/dashboard' component={Dashboard}/>
    <Route exact path='/' component={Login}/>
    <Route exact path='/test' component={()=>(
      <div class="container-fluid content-row">
      <div className="row">
      <div className="col-sm-12 col-lg-6">
        <div className="card-hover-shadow-2x mb-3 card">
          <div className="card-header-tab card-header">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-database icon-gradient bg-malibu-beach"> </i>Tasks
              List
            </div>
            <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
              <div className="btn-group dropdown">
                <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-icon btn-icon-only btn btn-link"><i className="pe-7s-menu btn-icon-wrapper" /></button>
                <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu">
                  <h6 tabIndex={-1} className="dropdown-header">
                    Header</h6>
                  <button type="button" tabIndex={0} className="dropdown-item"><i className="dropdown-icon lnr-inbox"> </i><span>Menus</span>
                  </button>
                  <button type="button" tabIndex={0} className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i><span>Settings</span>
                  </button>
                  <button type="button" tabIndex={0} className="dropdown-item"><i className="dropdown-icon lnr-book"> </i><span>Actions</span>
                  </button>
                  <div tabIndex={-1} className="dropdown-divider" />
                  <div className="p-3 text-right">
                    <button className="mr-2 btn-shadow btn-sm btn btn-link">
                      View Details
                    </button>
                    <button className="mr-2 btn-shadow btn-sm btn btn-primary">
                      Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-area-lg">
            <div className="scrollbar-container ps ps--active-y">
              <div className="p-2">
                <ul className="todo-list-wrapper list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="todo-indicator bg-warning" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox12">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">Wash the car
                            <div className="badge badge-danger ml-2">
                              Rejected
                            </div>
                          </div>
                          <div className="widget-subheading"><i>Written
                              by Bob</i></div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                          <button className="border-0 btn-transition btn btn-outline-danger">
                            <i className="fa fa-trash-alt" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-focus" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox1">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">Task with
                            dropdown menu
                          </div>
                          <div className="widget-subheading">
                            <div>By Johnny
                              <div className="badge badge-pill badge-info ml-2">
                                NEW
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <div className="d-inline-block dropdown">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                              <i className="fa fa-ellipsis-h" />
                            </button>
                            <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                              <h6 tabIndex={-1} className="dropdown-header">
                                Header</h6>
                              <button type="button" disabled tabIndex={-1} className="disabled dropdown-item">
                                Action
                              </button>
                              <button type="button" tabIndex={0} className="dropdown-item">
                                Another Action
                              </button>
                              <div tabIndex={-1} className="dropdown-divider" />
                              <button type="button" tabIndex={0} className="dropdown-item">
                                Another Action
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-primary" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox4">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">Badge on the
                            right task
                          </div>
                          <div className="widget-subheading">This task
                            has show on hover actions!
                          </div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                        </div>
                        <div className="widget-content-right ml-3">
                          <div className="badge badge-pill badge-success">
                            Latest Task
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-info" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox2">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left mr-3">
                          <div className="widget-content-left">
                            <img width={42} className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                          </div>
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">Go grocery
                            shopping
                          </div>
                          <div className="widget-subheading">A short
                            description for this todo item
                          </div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                          <button className="border-0 btn-transition btn btn-outline-danger">
                            <i className="fa fa-trash-alt" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-success" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox3">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">Development
                            Task
                          </div>
                          <div className="widget-subheading">Finish
                            React ToDo List App
                          </div>
                        </div>
                        <div className="widget-content-right">
                          <div className="badge badge-warning mr-2">
                            69
                          </div>
                        </div>
                        <div className="widget-content-right">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                          <button className="border-0 btn-transition btn btn-outline-danger">
                            <i className="fa fa-trash-alt" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-warning" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox12">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">Wash the car
                            <div className="badge badge-danger ml-2">
                              Rejected
                            </div>
                          </div>
                          <div className="widget-subheading"><i>Written
                              by Bob</i></div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                          <button className="border-0 btn-transition btn btn-outline-danger">
                            <i className="fa fa-trash-alt" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-focus" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox1">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">Task with
                            dropdown menu
                          </div>
                          <div className="widget-subheading">
                            <div>By Johnny
                              <div className="badge badge-pill badge-info ml-2">
                                NEW
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <div className="d-inline-block dropdown">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                              <i className="fa fa-ellipsis-h" />
                            </button>
                            <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                              <h6 tabIndex={-1} className="dropdown-header">
                                Header</h6>
                              <button type="button" disabled tabIndex={-1} className="disabled dropdown-item">
                                Action
                              </button>
                              <button type="button" tabIndex={0} className="dropdown-item">
                                Another Action
                              </button>
                              <div tabIndex={-1} className="dropdown-divider" />
                              <button type="button" tabIndex={0} className="dropdown-item">
                                Another Action
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-primary" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox4">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">Badge on the
                            right task
                          </div>
                          <div className="widget-subheading">This task
                            has show on hover actions!
                          </div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                        </div>
                        <div className="widget-content-right ml-3">
                          <div className="badge badge-pill badge-success">
                            Latest Task
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-info" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox2">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left mr-3">
                          <div className="widget-content-left">
                            <img width={42} className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                          </div>
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">Go grocery
                            shopping
                          </div>
                          <div className="widget-subheading">A short
                            description for this todo item
                          </div>
                        </div>
                        <div className="widget-content-right widget-content-actions">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                          <button className="border-0 btn-transition btn btn-outline-danger">
                            <i className="fa fa-trash-alt" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="todo-indicator bg-success" />
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                          <div className="custom-checkbox custom-control">
                            <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox3">&nbsp;</label>
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">Development
                            Task
                          </div>
                          <div className="widget-subheading">Finish
                            React ToDo List App
                          </div>
                        </div>
                        <div className="widget-content-right">
                          <div className="badge badge-warning mr-2">
                            69
                          </div>
                        </div>
                        <div className="widget-content-right">
                          <button className="border-0 btn-transition btn btn-outline-success">
                            <i className="fa fa-check" />
                          </button>
                          <button className="border-0 btn-transition btn btn-outline-danger">
                            <i className="fa fa-trash-alt" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="ps__rail-x" style={{left: '0px', bottom: '-297px'}}><div className="ps__thumb-x" tabIndex={0} style={{left: '0px', width: '0px'}} /></div><div className="ps__rail-y" style={{top: '297px', height: '400px', right: '0px'}}><div className="ps__thumb-y" tabIndex={0} style={{top: '170px', height: '229px'}} /></div></div>
          </div>
          <div className="d-block text-right card-footer">
            <button className="mr-2 btn btn-link btn-sm">Cancel</button>
            <button className="btn btn-primary">Add Task</button>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-lg-6">
        <div className="card-hover-shadow-2x mb-3 card">
          <div className="card-header-tab card-header">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-printer icon-gradient bg-ripe-malin"> </i>Chat
              Box
            </div>
            <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
              <div className="btn-group dropdown">
                <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-icon btn-icon-only btn btn-link"><i className="pe-7s-menu btn-icon-wrapper" /></button>
                <div tabIndex={-1} role="menu" aria-hidden="true" className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu">
                  <h6 tabIndex={-1} className="dropdown-header">
                    Header</h6>
                  <button type="button" tabIndex={0} className="dropdown-item"><i className="dropdown-icon lnr-inbox"> </i><span>Menus</span>
                  </button>
                  <button type="button" tabIndex={0} className="dropdown-item"><i className="dropdown-icon lnr-file-empty"> </i><span>Settings</span>
                  </button>
                  <button type="button" tabIndex={0} className="dropdown-item"><i className="dropdown-icon lnr-book"> </i><span>Actions</span>
                  </button>
                  <div tabIndex={-1} className="dropdown-divider" />
                  <div className="p-3 text-right">
                    <button className="mr-2 btn-shadow btn-sm btn btn-link">
                      View Details
                    </button>
                    <button className="mr-2 btn-shadow btn-sm btn btn-primary">
                      Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-area-lg">
            <div className="scrollbar-container ps ps--active-y">
              <div className="p-2">
                <div className="chat-wrapper p-1">
                  <div className="chat-box-wrapper">
                    <div>
                      <div className="avatar-icon-wrapper mr-1">
                        <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                        <div className="avatar-icon avatar-icon-lg rounded">
                          <img src="assets/images/avatars/2.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="chat-box">But I must explain to you
                        how all this mistaken idea of denouncing
                        pleasure and praising pain was born and I
                        will give you a complete account of the
                        system.
                      </div>
                      <small className="opacity-6">
                        <i className="fa fa-calendar-alt mr-1" />
                        11:01 AM | Yesterday
                      </small>
                    </div>
                  </div>
                  <div className="float-right">
                    <div className="chat-box-wrapper chat-box-wrapper-right">
                      <div>
                        <div className="chat-box">Expound the actual
                          teachings of the great explorer of the
                          truth, the master-builder of human
                          happiness.
                        </div>
                        <small className="opacity-6">
                          <i className="fa fa-calendar-alt mr-1" />
                          11:01 AM | Yesterday
                        </small>
                      </div>
                      <div>
                        <div className="avatar-icon-wrapper ml-1">
                          <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                          <div className="avatar-icon avatar-icon-lg rounded">
                            <img src="assets/images/avatars/3.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-box-wrapper">
                    <div>
                      <div className="avatar-icon-wrapper mr-1">
                        <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                        <div className="avatar-icon avatar-icon-lg rounded">
                          <img src="assets/images/avatars/2.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="chat-box">But I must explain to you
                        how all this mistaken idea of denouncing
                        pleasure and praising pain was born and I
                        will give you a complete account of the
                        system.
                      </div>
                      <small className="opacity-6">
                        <i className="fa fa-calendar-alt mr-1" />
                        11:01 AM | Yesterday
                      </small>
                    </div>
                  </div>
                  <div className="float-right">
                    <div className="chat-box-wrapper chat-box-wrapper-right">
                      <div>
                        <div className="chat-box">Denouncing pleasure
                          and praising pain was born and I will
                          give you a complete account.
                        </div>
                        <small className="opacity-6">
                          <i className="fa fa-calendar-alt mr-1" />
                          11:01 AM | Yesterday
                        </small>
                      </div>
                      <div>
                        <div className="avatar-icon-wrapper ml-1">
                          <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                          <div className="avatar-icon avatar-icon-lg rounded">
                            <img src="assets/images/avatars/2.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="float-right">
                    <div className="chat-box-wrapper chat-box-wrapper-right">
                      <div>
                        <div className="chat-box">The master-builder of
                          human happiness.
                        </div>
                        <small className="opacity-6">
                          <i className="fa fa-calendar-alt mr-1" />
                          11:01 AM | Yesterday
                        </small>
                      </div>
                      <div>
                        <div className="avatar-icon-wrapper ml-1">
                          <div className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg" />
                          <div className="avatar-icon avatar-icon-lg rounded">
                            <img src="assets/images/avatars/2.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps__rail-x" style={{left: '0px', bottom: '-213px'}}><div className="ps__thumb-x" tabIndex={0} style={{left: '0px', width: '0px'}} /></div><div className="ps__rail-y" style={{top: '213px', height: '400px', right: '0px'}}><div className="ps__thumb-y" tabIndex={0} style={{top: '139px', height: '260px'}} /></div></div>
          </div>
          <div className="card-footer">
            <input placeholder="Write here and hit enter to send..." type="text" className="form-control-sm form-control" />
          </div>
        </div>
      </div>
    </div>
    </div>
    
    )
}/>
    </Router>
  );
}

export const database = firebase.firestore();

export default App;