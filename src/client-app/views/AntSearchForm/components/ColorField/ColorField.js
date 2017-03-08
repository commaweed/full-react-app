import React, { Component, PropTypes } from 'react';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Select } from 'antd';
const Option = Select.Option;

// use axios to fetch these
const COLORS = [
   'Red',
   'Orange',
   'Yellow',
   'Green',
   'Blue',
   'Purple',
   'Black',
   'White',
];


class ColorField extends Component {

   constructor(props) {
      super(props);

      const value = this.props.value || {};
      this.state = {
         data: [],
         defaultValue: '',
         color: value.color || ''
      };
   }

   componentWillMount() {
      // simulate db fetch
      this.setState({ data: COLORS, defaultValue: COLORS[0] });
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
      const options = this.state.data.map(color => <Option key={color} value={color}>{color}</Option>);
      return (
         <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={this.handleColorChange}
            size="large"
            defaultValue={this.state.defaultValue}
         >
            {options}
         </Select>
      );
   }
}

ColorField.propTypes = {
   value: PropTypes.object,
   onChange: PropTypes.func
};

export { ColorField };
