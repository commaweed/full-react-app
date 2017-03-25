import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";
import { Layout, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import './app.css';

import store from "./app-redux/store";
import MainPage from "./pages/MainPage";

ReactDOM.render(
   <LocaleProvider locale={enUS}>
      <Provider store={store}>
         <Router history={hashHistory}>
            <Route path="/" component={MainPage} />
         </Router>
      </Provider>
   </LocaleProvider>
, document.getElementById("app"));
