import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";

import './app.css';

import store from "./app-redux/store";
import MainPage from "./pages/MainPage";

ReactDOM.render(
   <Provider store={store}>
      <Router history={hashHistory}>
         <Route path="/" component={MainPage} />
      </Router>
   </Provider>
, document.getElementById("app"));
