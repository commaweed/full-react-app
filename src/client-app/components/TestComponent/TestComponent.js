import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { purple500 } from 'material-ui/styles/colors';


class TestComponent extends Component {
   render() {

      const style = {
         margin: 12,
      };

      return (
         <div>
            <RaisedButton label="Default" style={style} />
            <RaisedButton label="Primary" primary={true} style={style} />
            <RaisedButton label="Secondary" secondary={true} style={style} />
            <RaisedButton label="Disabled" disabled={true} style={style} />
            <RaisedButton label="Custom" backgroundColor={purple500} style={style} />


            <br />
            <br />
            <RaisedButton label="Full width" fullWidth={true} />
         </div>
      );
   }
}

export { TestComponent };
