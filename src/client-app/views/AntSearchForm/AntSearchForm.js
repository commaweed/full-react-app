import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

import ColorField from './components/ColorField';

function hasErrors(fieldsError) {
   return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FIELDS = {
   colorField: {
      name: 'colorField',
      rules: [
         { required: true, message: 'Please choose a color!' }
      ]
   },
   searchField: {
      name: 'searchField',
      rules: [
         { required: true, message: 'Please enter the search term!' }
      ]
   }
};

class AntSearchForm extends Component {

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
   }

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            console.log('Received values of form: ', values);
         }
      });
   };

   //handleEnterPress = (e) => {
   //   console.log('enter pressed');
   //};
//onPressEnter={ me.handleEnterPress }

   resetSearchField = () => {
      this.searchTextField.focus();
      const fieldValues = Object.create({});
      fieldValues[FIELDS.searchField.name] = '';
      this.props.form.setFieldsValue(fieldValues);
      this.props.form.validateFields();

   };

   render() {

      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;

      // Only show error after a field is touched.
      const colorFieldError = isFieldTouched(FIELDS.colorField.name) && getFieldError(FIELDS.colorField.name);
      const searchFieldError = isFieldTouched(FIELDS.searchField.name) && getFieldError(FIELDS.searchField.name);
      const suffix = getFieldValue(FIELDS.searchField.name) ? <IoCloseCircled onClick={ this.resetSearchField.bind(this) } /> : null;

      const me = this;

      return (

         <Form styleName="searchForm" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
               <Col span={5}>
                  <FormItem
                     styleName="colorField"
                     wrapperCol={{ span: 24 }}
                     validateStatus={colorFieldError ? 'error' : ''}
                     help={colorFieldError || ''}
                  >
                     { getFieldDecorator(FIELDS.colorField.name, { rules: FIELDS.colorField.rules })(
                        <ColorField/>
                     )}
                  </FormItem>
               </Col>
               <Col span={17}>
                  <FormItem
                     wrapperCol={{ span: 24 }}
                     validateStatus={searchFieldError ? 'error' : ''}
                     help={searchFieldError || ''}
                  >
                     {getFieldDecorator(FIELDS.searchField.name, { rules: FIELDS.searchField.rules, })(
                        <Input
                           placeholder="Enter Search Term"
                           prefix={<FaSearch/>}
                           suffix={suffix}
                           ref={ (input) => { me.searchTextField = input; } }
                           size="large"
                        />
                     )}
                  </FormItem>
               </Col>
               <Col span={2}>
                  <FormItem  wrapperCol={{ span: 24 }}>
                     <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                     >
                        Submit
                     </Button>
                  </FormItem>
               </Col>
            </Row>
         </Form>

      );
   }
}

export { AntSearchForm };
