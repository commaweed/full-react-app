import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import ToolBar from './components/ToolBar';

class SearchForm extends Component {

   constructor(props) {
      super(props);
      this.state = {
         expanded: false
      };
   }

   handleExpandChange = (expanded) => {
      this.setState({expanded: expanded});
   };

   render() {

      const styles = {
         cardContainerStyles: {
            padding: 0
         },
         cardStyles: {
            //marginLeft: "20px",
            //marginRight: "20px"
         },
         toolBarStyles: {
            //padding: "0px"
         },
         advancedStyles: {
            //height: 100,
            //width: 100,
            marginLeft: "20px",
            marginRight: "20px"
            //textAlign: 'center',
            //display: 'inline-block',
         }
      };

      return (
         <Paper style={styles.advancedStyles} zDepth={2} rounded={false}>
         <Card
            expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}
            containerStyle={styles.cardContainerStyles}
            style={styles.cardStyles}
         >
            <ToolBar onExpandChange={this.handleExpandChange.bind(this)} />
            <CardText expandable={true}>

               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
               Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
               Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
               Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

            </CardText>
         </Card>
         </Paper>
      );
   }
}

export { SearchForm };
