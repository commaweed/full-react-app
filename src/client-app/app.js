import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppTitleBar from './views/AppTitleBar';
import SearchForm from './views/SearchForm';

import './app.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
   <MuiThemeProvider>
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