import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

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
            padding: "0px"
         },
         cardStyles: {
            marginLeft: "20px",
            marginRight: "20px"
         },
         toolBarStyles: {
            padding: "5px"
         }
      };

      return (
         <Card
            expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}
            containerStyle={styles.cardContainerStyles}
            style={styles.cardStyles}
         >
            <CardText style={styles.toolBarStyles}>
               <ToolBar onExpandChange={this.handleExpandChange.bind(this)} />
            </CardText>
            <CardText expandable={true}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
               Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
               Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
               Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
         </Card>
      );
   }
}

export { SearchForm };
