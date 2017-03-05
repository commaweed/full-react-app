import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import IndigoTheme from './views/Themes';

import AppTitleBar from './views/AppTitleBar';
import SearchForm from './views/SearchForm';

import './app.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
   <MuiThemeProvider muiTheme={getMuiTheme(IndigoTheme)}>
      <div>
      <AppTitleBar />
         <br/>
      <SearchForm/>
      </div>
   </MuiThemeProvider>
);

ReactDOM.render(
   <App>hello</App>,
   document.getElementById('app')
);