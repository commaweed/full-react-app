import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentClear from 'material-ui/svg-icons/content/clear';

import ResetButton from '../ResetButton';
import ColorLookup from '../ColorLookup';

import { Input, Icon } from 'antd';

const Search = Input.Search;

class ToolBar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         menuValue: 1,
         searchFormType: 'Basic',
         searchTerm: ''
      };
   }

   componentDidMount() {
      this.searchTextField.focus();
   }

   handleSearchTermChange(event) {
      console.log('handleSearchTermChange');
      this.setState({ searchTerm: event.target.value });
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

   emitEmpty = () => {
      console.log('emitEmpty');
      this.searchTextField.focus();
      this.setState({ searchTerm: '' });
   };

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
            paddingTop: 37,
            paddingBottom: 37
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
      /*
       floatingLabelStyle={styles.floatingLabelStyle}
       floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

       <ResetButton onResetClicked={this.handleSearchTermReset.bind(this)} tooltip="Reset Search Term" />
       <TextField
       ref={ (input) => { this.searchTextField = input; } }
       floatingLabelText="Search Term"
       fullWidth={true}
       id='search-term-tf'
       onKeyUp={this.handleSearchTermKeyUp.bind(this)}
       />

       <Input
       placeholder="Enter Search Term"
       prefix={<Icon type="search" />}
       suffix={suffix}
       value={searchTerm}
       onChange={ this.handleSearchTermChange.bind(this) }
       ref={ (input) => { this.searchTextField = input; } }
       size="large"
       />

       */

      const { searchTerm } = this.state;
      const suffix = searchTerm ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

      return (
         <Toolbar style={styles.toolBarStyles}>
            <ToolbarGroup firstChild={true} style={{width: "90%"}}>
               <ResetButton onResetClicked={this.handleColorReset.bind(this)} tooltip="Reset Color" />
               <ColorLookup />

               <ResetButton onResetClicked={this.handleSearchTermReset.bind(this)} tooltip="Reset Search Term" />
               <TextField
                  ref={ (input) => { this.searchTextField = input; } }
                  floatingLabelText="Search Term"
                  fullWidth={true}
                  id='search-term-tf'
                  onKeyUp={this.handleSearchTermKeyUp.bind(this)}
               />

               <RaisedButton
                  label="Submit"
                  primary={true}
                  icon={ <ActionSearch/> }
                  style={{ width: 200 }}
               />
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
