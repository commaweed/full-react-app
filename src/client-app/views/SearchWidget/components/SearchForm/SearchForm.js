import React, { Component, PropTypes } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Form, Icon, Input, Button, Row, Col, Switch, Select, Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import ColorField from './components/ColorField';

import { submitQuery} from "../../../../app-redux/actions/searchFormActions";

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

const rowGutterSize = 16;

function hasErrors(fieldsError) {
   return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function getPotentialError(fieldName, form) {
   return form.isFieldTouched(fieldName) && form.getFieldError(fieldName);
}

function addFormLabelRow(label1, label2) {
   const col1LabelProps = { xs: 4, sm: 4, md: 4, lg: 4, style: { marginLeft: 10} };
   const col2LabelProps = { xs: 20, sm: 20, md: 20, lg: 20, style: { marginLeft: -10} };

   return (
      <Row gutter={ rowGutterSize }>
         <Col {...col1LabelProps}>{label1 ? label1 : ''}</Col>
         <Col {...col2LabelProps}>{label2 ? label2 : ''}</Col>
      </Row>
   );
}

class SearchForm extends Component {

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

   handleReset() {
      this.props.form.resetFields();
      this.props.form.validateFields();
   }

   render() {

      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
      const { isAdvancedForm } = this.props;

      // Only show error after a field is touched.
      const colorFieldError = getPotentialError(FIELDS.colorField.name, this.props.form);
      const searchFieldError = getPotentialError(FIELDS.searchField.name, this.props.form);
      const withinFieldError = getPotentialError(FIELDS.withinField.name, this.props.form);
      const suffix = getFieldValue(FIELDS.searchField.name) ? <IoCloseCircled onClick={ this.resetSearchField.bind(this) } /> : null;

      const col1LabelProps = { xs: 4, sm: 4, md: 4, lg: 4, style: { marginLeft: 10} };
      const col2LabelProps = { xs: 20, sm: 20, md: 20, lg: 20, style: { marginLeft: -10} };
      const col1FieldProps = { xs: 4, sm: 4, md: 4, lg: 4 };
      const col2FieldProps = { xs: 11, sm: 12, md: 13, lg: 15 };

      const me = this;

      return (
         <Form styleName="search-form" onSubmit={this.handleSubmit}>
            { addFormLabelRow('Color', 'Search') }
            <Row gutter={ rowGutterSize }>
               <Col {...col1FieldProps}>
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
               <Col {...col2FieldProps}>
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
               <Col xs={2} sm={2} md={2} lg={2}>
                  <FormItem  wrapperCol={{ span: 24 }}>
                     <Button.Group size="default">
                        <Button
                           type="primary"
                           htmlType="submit"
                           disabled={hasErrors(getFieldsError())}
                        >
                           Submit
                        </Button>
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
                     </Button.Group>
                  </FormItem>
               </Col>
            </Row>

            {
               isAdvancedForm &&
               <div>
                  { addFormLabelRow(null, 'Additional Search Term') }
                  <Row gutter={ rowGutterSize }>
                     <Col {...col1FieldProps}>
                     </Col>
                     <Col {...col2FieldProps}>
                        blah
                     </Col>
                  </Row>
                  <Row gutter={ rowGutterSize }>
                     <Col {...col1LabelProps}>Within</Col>
                     <Col {...col2LabelProps}>Orth</Col>
                  </Row>
                  <Row gutter={ rowGutterSize }>
                     <Col {...col1FieldProps}>
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

SearchForm.propTypes = {
   isAdvancedForm: PropTypes.bool
};

export { SearchForm };
