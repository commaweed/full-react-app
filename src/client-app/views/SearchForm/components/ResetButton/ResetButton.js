import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

class ResetButton extends Component {

   constructor(props) {
      super(props);
   }

   handleResetClick() {
      this.props.onResetClicked();
   }

   render() {

      const styles = {
         resetButtonStyles: {
            padding: 0,
            margin: 0
         }
      };

      return (
         <IconButton
            tooltip="Reset Search Term"
            tooltipPosition="bottom-right"
            onClick={this.handleResetClick.bind(this)}
         >
            <ContentClear/>
         </IconButton>
      );
   }
}

ResetButton.propTypes = {
   onResetClicked: PropTypes.func,
   tooltip: PropTypes.string
};

ResetButton.defaultProps = {
   tooltip: 'reset'
};

export { ResetButton };

/*
 <FlatButton
 backgroundColor={this.props.muiTheme.palette.accent3Color}
 hoverColor="#8AA62F"
 icon={<ContentClear color={this.props.muiTheme.palette.accent1Color} />}
 style={styles.resetButtonStyles}
 onClick={this.handleResetClick.bind(this)}
 />
 */
