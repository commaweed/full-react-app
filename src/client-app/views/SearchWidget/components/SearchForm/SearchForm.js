import React, { Component, PropTypes } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import FaCog from 'react-icons/lib/fa/cog';
import IoCloseCircled from 'react-icons/lib/io/close-circled';

import { Form, Icon, Input, Button, Row, Col, Switch, Select, Popconfirm, Tooltip } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import ColorField from './components/ColorField';
import OptionsModalForm from './components/OptionsModalForm';

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
   additionalSearchField: {
      name: 'additionalSearchField',
      rules: [
         { required: false }
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
   const col1LabelProps = { span: 4, style: { marginLeft: 10} };
   const col2LabelProps = { span: 20, style: { marginLeft: -10} };

   function getLabelValue(label) {
      if (!label) return '';
      if (typeof label === 'string') return label;
      if (!label.name) return '';
      if (label.name && !label.isRequired) return label.name;
      const requiredStyle = { color: 'red' };
      return (<span><i style={requiredStyle}>*</i>{label.name}</span>);
   }

   return (
      <Row gutter={ rowGutterSize }>
         <Col {...col1LabelProps}>{getLabelValue(label1)}</Col>
         <Col {...col2LabelProps}>{getLabelValue(label2)}</Col>
      </Row>
   );
}

class SearchForm extends Component {

   constructor(props) {
      super(props);

      this.state = {
         moreOptionsVisibility: false
      };
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

   resetAdditionalSearchField = () => {
      this.additionalSearchTermField.focus();
      const fieldValues = Object.create({});
      fieldValues[FIELDS.additionalSearchField.name] = '';
      this.props.form.setFieldsValue(fieldValues);
   };

   handleReset() {
      this.props.form.resetFields();
      this.props.form.validateFields();
   }

   handleMoreOptionsClick() {
      this.setState({ moreOptionsVisibility: true });
   }

   handleMoreOptionsOk() {
      this.setState({ moreOptionsVisibility: false });
   }

   handleMoreOptionsCancel() {
      this.setState({ moreOptionsVisibility: false });
   }

   render() {

      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = this.props.form;
      const { isAdvancedForm, fetching } = this.props;

      // Only show error after a field is touched.
      const colorFieldError = getPotentialError(FIELDS.colorField.name, this.props.form);
      const searchFieldError = getPotentialError(FIELDS.searchField.name, this.props.form);
      const withinFieldError = getPotentialError(FIELDS.withinField.name, this.props.form);
      const searchTermSuffix = getFieldValue(FIELDS.searchField.name) ? <IoCloseCircled onClick={ this.resetSearchField.bind(this) } /> : null;
      const additionalSearchTermSuffix = getFieldValue(FIELDS.additionalSearchField.name) ? <IoCloseCircled onClick={ this.resetAdditionalSearchField.bind(this) } /> : null;

      const col1FieldProps = { span: 4 };
      const col2FieldProps = { xs: 13, sm: 14, md: 15, lg: 16 };
      const col3FieldProps = { xs: 6, sm: 5, md: 4, lg: 3 };
      const col4FieldProps = { span: 1 };

      const additionalSearchTermPrefixSelector = getFieldDecorator('additionalSearchTermPrefix', {
         initialValue: 'AND',
      })(
         <Select style={{ width: 100}}>
            <Option value="AND">AND</Option>
            <Option value="OR">OR</Option>
            <Option value="NEAR">NEAR</Option>
            <Option value="BEFORE">BEFORE</Option>
            <Option value="AFTER">AFTER</Option>
         </Select>
      );

      const me = this;

      return (
         <div>
            <OptionsModalForm
               onOk={ this.handleMoreOptionsOk.bind(this) }
               onCancel={ this.handleMoreOptionsCancel.bind(this)  }
               visible={ this.state.moreOptionsVisibility }
            />
            <Form styleName="search-form" onSubmit={this.handleSubmit}>
               { addFormLabelRow('Color', { name: 'Search', isRequired: true }) }
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
                              suffix={searchTermSuffix}
                              ref={ (input) => { me.searchTextField = input; } }
                              size="large"
                           />
                        )}
                     </FormItem>
                  </Col>
                  <Col {...col3FieldProps}>
                     <FormItem  wrapperCol={{ span: 24 }}>
                        <Button.Group size="default">
                           <Button
                              type="primary"
                              htmlType="submit"
                              disabled={hasErrors(getFieldsError())}
                              loading={fetching}
                              style={{ width: 100 }}
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
                  <Col {...col4FieldProps}>
                     <Tooltip placement="bottom" title={(<span>Additional Search Options</span>)}>
                        <Button
                           type="primary"
                           htmlType="button"
                           shape="circle"
                           onClick={ this.handleMoreOptionsClick.bind(this) }
                        >
                           <FaCog size={15} color="white" style={{ marginBottom: 1, paddingLeft: 1 }}/>
                        </Button>
                     </Tooltip>

                  </Col>
               </Row>

               {
                  isAdvancedForm &&
                  <div>
                     { addFormLabelRow("Orth", 'Additional Search Term') }
                     <Row gutter={ rowGutterSize }>
                        <Col {...col1FieldProps}>
                           <FormItem
                              styleName="far-left-field"
                              wrapperCol={{ span: 24 }}
                           >
                              { getFieldDecorator(FIELDS.orthField.name, { rules: FIELDS.orthField.rules })(
                                 <Select
                                    showSearch
                                    placeholder="(Optional) Choose Orth"
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
                        <Col {...col2FieldProps}>
                           <FormItem
                              wrapperCol={{ span: 24 }}
                           >
                              { getFieldDecorator(FIELDS.additionalSearchField.name, { rules: FIELDS.additionalSearchField.rules })(
                                 <Input
                                    placeholder="(Optional) Enter Additional Search Term"
                                    addonBefore={additionalSearchTermPrefixSelector}
                                    suffix={additionalSearchTermSuffix}
                                    ref={ (input) => { me.additionalSearchTermField = input; } }
                                    size="large"
                                 />
                              )}
                           </FormItem>
                        </Col>
                     </Row>
                     { addFormLabelRow("Within", null) }
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
                        <Col span={16}>

                        </Col>
                     </Row>
                  </div>
               }

            </Form>
         </div>
      );
   }
}

SearchForm.propTypes = {
   isAdvancedForm: PropTypes.bool
};

export { SearchForm };
