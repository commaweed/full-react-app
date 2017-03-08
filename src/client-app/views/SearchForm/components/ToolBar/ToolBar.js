import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AntSearchForm from '../../../AntSearchForm';

class ToolBar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         searchFormType: 'Basic'
      };
   }

   handleOnToggle(event, isInputChecked) {
      this.setState({searchFormType: isInputChecked ? 'Advanced' : 'Basic' });
      this.props.onExpandChange(isInputChecked);
   }

   render() {

      const styles = {
         toolBarStyles: {
            paddingTop: 37,
            paddingBottom: 37
         }
      };

      return (
         <Toolbar style={styles.toolBarStyles}>
            <ToolbarGroup firstChild={true} style={{width: "90%"}}>
               <AntSearchForm/>
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
