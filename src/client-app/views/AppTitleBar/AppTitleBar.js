import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import Logo from './components/Logo';
import ThemeMenu from './components/ThemeMenu';

class AppTitleBar extends Component {
   render() {

      const styles = {
         title: {
            //cursor: 'pointer',
         }
      };

      function handleTouchTap() {
         alert('onTouchTap triggered on the title component');
      }

      //onTitleTouchTap={handleTouchTap}
      return (
         <AppBar
            title={<span style={styles.title}><Logo/></span>}
            iconElementRight={<ThemeMenu/>}
            showMenuIconButton={false}
         />
      );
   }
}

export { AppTitleBar };
