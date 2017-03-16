import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Form, Icon, Input, Button, Row, Col, Switch } from 'antd';
const FormItem = Form.Item;

import ColorField from './components/ColorField';

import { submitQuery} from "../../../../app-redux/actions/searchFormActions";

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

class SearchForm extends Component {

   constructor(props) {
      super(props);
      this.state = { switchChecked: false };
   }

   componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
   }

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            const formValues = {
               color: values.colorField.color.color,
               searchTerm: values.searchField
            };
            console.log('Received values from form: ', formValues);
            this.props.dispatch(submitQuery(formValues));
         }
      });
   };

   resetSearchField = () => {
      this.searchTextField.focus();
      const fieldValues = Object.create({});
      fieldValues[FIELDS.searchField.name] = '';
      this.props.form.setFieldsValue(fieldValues);
      this.props.form.validateFields();

   };

   handleSwitchChange(checked) {
      this.setState({switchChecked: checked });
   }

   getSwitchValue = () => { return this.state.switchChecked ? 'Advanced' : 'Basic'; };

   render() {

      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;

      // Only show error after a field is touched.
      const colorFieldError = isFieldTouched(FIELDS.colorField.name) && getFieldError(FIELDS.colorField.name);
      const searchFieldError = isFieldTouched(FIELDS.searchField.name) && getFieldError(FIELDS.searchField.name);
      const suffix = getFieldValue(FIELDS.searchField.name) ? <IoCloseCircled onClick={ this.resetSearchField.bind(this) } /> : null;

      const me = this;

      let advancedForm = null;
      if (this.state.switchChecked) {
         advancedForm = (
            <Row gutter={16}>
               <Col span={24}>
                  <h1>advanced stuff here</h1>
               </Col>
            </Row>
         );
      }

      return (

         <Form styleName="search-form" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
               <Col xs={4} sm={4} md={4} lg={4} style={{marginLeft: 10}}>Color</Col>
               <Col xs={20} sm={20} md={20} lg={20} style={{marginLeft: -10}}>Search</Col>
            </Row>
            <Row gutter={16}>
               <Col xs={4} sm={4} md={4} lg={4}>
                  <FormItem
                     styleName="color-field"
                     wrapperCol={{ span: 24 }}
                     validateStatus={colorFieldError ? 'error' : ''}
                     help={colorFieldError || ''}
                  >
                     { getFieldDecorator(FIELDS.colorField.name, { rules: FIELDS.colorField.rules })(
                        <ColorField/>
                     )}
                  </FormItem>
               </Col>
               <Col xs={12} sm={13} md={14} lg={16}>
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
               <Col xs={1} sm={1} md={1} lg={1}>
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
               <Col xs={7} sm={6} md={5} lg={3} push={1} style={{ padding: 10 }}>
                  <Switch defaultChecked={false}
                       onChange={this.handleSwitchChange.bind(this) }
                       checkedChildren={this.getSwitchValue()}
                       unCheckedChildren={this.getSwitchValue()}
                       styleName="switch"
                  />
               </Col>
            </Row>
            {advancedForm}
         </Form>

      );
   }
}

export { SearchForm };
