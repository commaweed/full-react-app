import React, { Component, PropTypes } from 'react';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Select } from 'antd';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

import { fetchColors } from "../../../../../../app-redux/actions/colorsActions";

class ColorField extends Component {

   constructor(props) {
      super(props);

      const value = this.props.value || {};
      this.state = {
         color: value.color || '',
         // think default should go here too
      };
   }

   componentWillMount() {
      this.props.dispatch(fetchColors());
   }

   handleColorChange = (color) => {
      if (!('value' in this.props)) {
         this.setState({ color: color });
      }
      this.triggerChange({ color });
   };

   triggerChange = (changedValue) => {
      const onChange = this.props.onChange;
      if (onChange) {
         onChange(Object.assign({}, { color: changedValue}));
      }
   };

   componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
         const value = nextProps.value;
         if (value) this.setState({color: value.color});
      }
   }

   render() {
      const { colors, defaultValue } = this.props;
      console.log(this.props);
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
            defaultValue={defaultValue}
         >
            <OptGroup label="Color">
               {options}
            </OptGroup>
         </Select>
      );
   }
}

ColorField.propTypes = {
   value: PropTypes.object,
   onChange: PropTypes.func
};

export { ColorField };
