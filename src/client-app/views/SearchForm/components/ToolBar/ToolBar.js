import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentClear from 'material-ui/svg-icons/content/clear';

import ResetButton from '../ResetButton';
import ColorLookup from '../ColorLookup';

class ToolBar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         menuValue: 1,
         searchFormType: 'Basic'
      };
   }

   handleMenuChange(event, index, value) {
      this.setState({menuValue: value});
   }

   handleOnToggle(event, isInputChecked) {
      this.setState({searchFormType: isInputChecked ? 'Advanced' : 'Basic' });
      this.props.onExpandChange(isInputChecked);
   }

   handleSearchTermReset() {
      document.getElementById('search-term-tf').value = null;
   }

   handleSearchTermKeyUp(event) {
      if (event.keyCode === 13 || event.charCode === 13) {
         console.log('submit query');
      }
   }

   handleColorReset() {
      console.log('handleColorReset');
   }

   render() {

      const styles = {
         floatingLabelStyle: {
            color: this.props.muiTheme.palette.primary1Color,
         },
         floatingLabelFocusStyle: {
            color: this.props.muiTheme.palette.accent1Color,
         },
         actionSearchStyles: {
            marginRight: "5px",
            marginTop: "5px",
            width: "45px",
            height: "45px"
         },
         toolBarStyles: {
         },
         resetButtonStyles: {
            padding: 0,
            margin: 0
         }
      };

      const colors = [
         'Red',
         'Orange',
         'Yellow',
         'Green',
         'Blue',
         'Purple',
         'Black',
         'White',
      ];

      return (
         <Toolbar>
            <ToolbarGroup firstChild={true} style={{width: "95%"}}>
               <ResetButton onResetClicked={this.handleColorReset.bind(this)}/>
               <ColorLookup />
               <ResetButton onResetClicked={this.handleSearchTermReset.bind(this)}/>
               <TextField
                  floatingLabelText="Search Term"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  fullWidth={true}
                  id='search-term-tf'
                  onKeyUp={this.handleSearchTermKeyUp.bind(this)}
               />
               <ActionSearch style={styles.actionSearchStyles}/>
            </ToolbarGroup>
            <ToolbarGroup>
               <Toggle
                  label={this.state.searchFormType}
                  labelPosition="left"
                  style={styles.toggle}
                  onToggle={this.handleOnToggle.bind(this)}
               />
            </ToolbarGroup>
         </Toolbar>
      );
   }
}

ToolBar.propTypes = {
   onExpandChange: PropTypes.func
};

export { ToolBar };
