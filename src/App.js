import React from "react";
import {createBrowserHistory} from "history";
import {Route, Router} from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Login from "./components/login/LoginForm";
import firebase from 'firebase'
import firebaseConfig from './components/firebaseconfig';


// initializing database with config file
firebase.initializeApp(firebaseConfig);

const history = createBrowserHistory();

const App = () => {
  return(
    <Router history={history}>
    <Route path='/dashboard' component={Dashboard}/>
    <Route exact path='/' component={Login}/>
    </Router>
  );
}

//initialized database object for updating collections and documents
export const database = firebase.firestore();

export default App;