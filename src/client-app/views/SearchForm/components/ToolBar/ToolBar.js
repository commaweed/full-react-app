import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {orange500, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentClear from 'material-ui/svg-icons/content/clear';

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

   handleResetClick(event) {
      document.getElementById('search-term-tf').value = null;
   }

   handleSearchTermKeyUp(event) {
      if (event.keyCode === 13 || event.charCode === 13) {
         console.log('submit query');
      }
   }

   render() {

      const styles = {
         floatingLabelStyle: {
            color: orange500,
         },
         floatingLabelFocusStyle: {
            color: blue500,
         },
         actionSearchStyles: {
            marginRight: "5px",
            marginTop: "5px",
            width: "45px",
            height: "45px"
         },
         toolBarStyles: {
         },
         autoCompleteStyles: {
            paddingLeft: "5px"
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
               <AutoComplete
                  floatingLabelText="Color"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={colors}
                  maxSearchResults={5}
                  openOnFocus={true}
                  style={styles.autoCompleteStyles}
               />
               <ActionSearch style={styles.actionSearchStyles}/>
               <TextField
                  floatingLabelText="Search Term"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  fullWidth={true}
                  id='search-term-tf'
                  onKeyUp={this.handleSearchTermKeyUp.bind(this)}
               />
               <IconButton
                  tooltip="Reset Search Term"
                  tooltipPosition="bottom-right"
                  onClick={this.handleResetClick.bind(this)}
               >
                  <ContentClear/>
               </IconButton>
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
