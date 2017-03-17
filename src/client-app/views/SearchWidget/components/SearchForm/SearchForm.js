import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Form, Icon, Input, Button, Row, Col, Switch, Select, Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

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
   },
   withinField: {
      name: 'withinField',
      rules: [
         { required: true, message: 'Please choose within!' }
      ]
   },
   orthField: {
      name: 'orthField',
      rules: [
         { required: false }
      ]
   }
};

function getPotentialError(fieldName, form) {
   return form.isFieldTouched(fieldName) && form.getFieldError(fieldName);
}

const rowGutterSize = 16;

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
            console.log('Received values from form: ', values);
            this.props.dispatch(submitQuery(values));
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

   handleReset() {
      this.props.form.resetFields();
      this.props.form.validateFields();
   }

   getSwitchValue = () => { return this.state.switchChecked ? 'Advanced' : 'Basic'; };

   render() {

      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
      const { switchChecked } = this.state;

      // Only show error after a field is touched.
      const colorFieldError = getPotentialError(FIELDS.colorField.name, this.props.form);
      const searchFieldError = getPotentialError(FIELDS.searchField.name, this.props.form);
      const withinFieldError = getPotentialError(FIELDS.withinField.name, this.props.form);
      const suffix = getFieldValue(FIELDS.searchField.name) ? <IoCloseCircled onClick={ this.resetSearchField.bind(this) } /> : null;

      const me = this;

      return (
         <Form styleName="search-form" onSubmit={this.handleSubmit}>
            <Row gutter={ rowGutterSize }>
               <Col xs={4} sm={4} md={4} lg={4} style={{marginLeft: 10}}>Color</Col>
               <Col xs={20} sm={20} md={20} lg={20} style={{marginLeft: -10}}>Search</Col>
            </Row>
            <Row gutter={ rowGutterSize }>
               <Col xs={4} sm={4} md={4} lg={4}>
                  <FormItem
                     styleName="far-left-field"
                     wrapperCol={{ span: 24 }}
                     validateStatus={colorFieldError ? 'error' : ''}
                     help={colorFieldError || ''}
                  >
                     { getFieldDecorator(FIELDS.colorField.name, { rules: FIELDS.colorField.rules, initialValue: 'Red' })(
                        <ColorField/>
                     )}
                  </FormItem>
               </Col>
               <Col xs={11} sm={12} md={13} lg={15}>
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
               <Col xs={1} sm={1} md={1} lg={1}>
                  <FormItem  wrapperCol={{ span: 24 }}>
                     <Popconfirm
                        placement="bottom"
                        title="Are you sure you want to reset all fields?"
                        onConfirm={this.handleReset.bind(this)}
                        okText="Yes"
                        cancelText="No"
                     >
                        <Button
                           type="default"
                           htmlType="reset"
                        >
                           Reset
                        </Button>
                     </Popconfirm>
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

            {
               switchChecked &&
               <div>
                  <Row gutter={ rowGutterSize }>
                     <Col xs={4} sm={4} md={4} lg={4} style={{marginLeft: 10}}/>
                     <Col xs={20} sm={20} md={20} lg={20} style={{marginLeft: -10}}>Additional</Col>
                  </Row>
                  <Row gutter={ rowGutterSize }>
                     <Col xs={4} sm={4} md={4} lg={4}>
                     </Col>
                     <Col xs={12} sm={13} md={14} lg={16}>
                        blah
                     </Col>
                     <Col xs={1} sm={1} md={1} lg={1}>

                     </Col>
                  </Row>
                  <Row gutter={ rowGutterSize }>
                     <Col xs={4} sm={4} md={4} lg={4} style={{marginLeft: 10}}>Within</Col>
                     <Col xs={20} sm={20} md={20} lg={20} style={{marginLeft: -10}}>Orth</Col>
                  </Row>
                  <Row gutter={ rowGutterSize }>
                     <Col xs={4} sm={4} md={4} lg={4}>
                        <FormItem
                           styleName="far-left-field"
                           wrapperCol={{ span: 24 }}
                           validateStatus={ withinFieldError ? 'error' : ''}
                           help={ withinFieldError || ''}
                        >
                           { getFieldDecorator(FIELDS.withinField.name, { rules: FIELDS.withinField.rules, initialValue: 'all' })(
                              <Select
                                 showSearch
                                 placeholder="Choose Within"
                                 optionFilterProp="children"
                                 filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                 <Option value="all">All Fields</Option>
                                 <Option value="words">Words</Option>
                                 <Option value="translation">Translation</Option>
                                 <Option value="definition">Translation + Definition</Option>
                              </Select>
                           )}
                        </FormItem>

                     </Col>
                     <Col xs={4} sm={4} md={4} lg={4}>
                        <FormItem
                           wrapperCol={{ span: 24 }}
                        >
                           { getFieldDecorator(FIELDS.orthField.name, { rules: FIELDS.orthField.rules })(
                              <Select
                                 showSearch
                                 placeholder="Choose Orth"
                                 optionFilterProp="children"
                                 filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                 allowClear={true}
                              >
                                 <Option value="oi">Oi</Option>
                                 <Option value="oisu">oi (S.U.)</Option>
                                 <Option value="oiss">Oi Syllabified and Stressed</Option>

                              </Select>
                           )}
                        </FormItem>
                     </Col>
                     <Col xs={12} sm={12} md={12} lg={12}>

                     </Col>
                  </Row>

               </div>
            }

         </Form>

      );
   }
}

export { SearchForm };
