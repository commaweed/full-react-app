import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import WbSunny from 'material-ui/svg-icons/image/wb-sunny';
import WbCloudy from 'material-ui/svg-icons/image/wb-cloudy';
import Palette from 'material-ui/svg-icons/image/palette';
import { amber500, grey900, white } from 'material-ui/styles/colors';

class ThemeMenu extends Component {

   constructor(props) {
      super(props);
      this.state = {
         value: 1
      };
   }

   handleMenuChange(event, value) {
      this.setState({value});
   }

   render() {

      const styles = {
         customWidth: {
            cursor: 'pointer'
         },
         lightColor: {
            color: 'yellow'
         },
         darkColor: {
            color: 'black'
         }
      };

      return (
         <IconMenu
            iconButtonElement={<IconButton><Palette color={white}/></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            maxHeight={200}
            onChange={this.handleMenuChange.bind(this)}
         >
            <MenuItem
               value={1}
               insetChildren={true}
               rightIcon={<WbSunny color={amber500}/>}
               primaryText="Light"
               checked={ this.state.value === 1 }
            />
            <MenuItem
               value={2}
               insetChildren={true}
               rightIcon={<WbCloudy color={grey900}/>}
               primaryText="Dark"
               checked={ this.state.value === 2 }
            />
         </IconMenu>
      );
   }
}

export { ThemeMenu };
