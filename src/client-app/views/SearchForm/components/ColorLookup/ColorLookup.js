import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import ResetButton from '../ResetButton';

class ColorLookup extends Component {

   constructor(props) {
      super(props);
      this.state = {
         searchText: ''
      };
   }

   handleUpdateInput = (searchText) => {
      this.setState({
         searchText: searchText,
      });
   };

   handleNewRequest = () => {
      this.setState({
         searchText: '',
      });
   };

   render() {

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

      const styles = {
         floatingLabelStyle: {
            color: this.props.muiTheme.palette.primary1Color,
         },
         floatingLabelFocusStyle: {
            color: this.props.muiTheme.palette.accent1Color,
         },
         autoCompleteStyles: {
            paddingLeft: "5px"
         }
      };

      return (

         <AutoComplete
            id="color-ac"
            floatingLabelText="Color"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            filter={AutoComplete.fuzzyFilter}
            dataSource={colors}
            maxSearchResults={5}
            openOnFocus={true}
            style={styles.autoCompleteStyles}
            searchText={this.state.colorSearchText}
         />

      );
   }
}

ColorLookup.propTypes = {

};

ColorLookup.defaultProps = {

};

export { ColorLookup };
