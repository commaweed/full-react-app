import React, { Component, PropTypes } from 'react';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Select } from 'antd';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

import { fetchColors } from "../../../../../../app-redux/actions/colorsActions";

class ColorField extends Component {

   constructor(props) {
      super(props);

      const chosenColor = this.props.value;
      this.state = {
         color: chosenColor || props.defaultValue
      };
   }

   componentWillMount() {
      this.props.dispatch(fetchColors());
   }

   handleColorChange = (color) => {
      if (!('value' in this.props)) {
         this.setState({ color: color });
      }
      this.triggerChange(color);
   };

   triggerChange = (changedValue) => {
      const onChange = this.props.onChange;
      if (onChange) {
         onChange(changedValue);
      }
   };

   componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
         const value = nextProps.value;
         const colors = nextProps.colors;
         if (value) {
            this.setState({color: value});
         } else if (colors && colors.length > 0) {
            this.setState({color: ''});
         }
      }
   }

   render() {
      const { colors } = this.props;
      let options=[];
      if (colors && colors.length > 0) {
         options = colors.map((color) => (<Option key={color} value={color}>{color}</Option>));
      }

      return (
         <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={this.handleColorChange}
            size="large"
            value={this.state.color}
         >
            <OptGroup label="Color">
               {options}
            </OptGroup>
         </Select>
      );
   }
}

ColorField.propTypes = {
   value: PropTypes.string,
   onChange: PropTypes.func
};

export { ColorField };
