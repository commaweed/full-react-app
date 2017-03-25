import React, { Component, PropTypes } from 'react';
import { Modal, Button, Checkbox, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

class OptionsModalForm extends Component {
   constructor(props) {
      super(props);
   }

   handleOk() {
      // save off form items
      this.props.onOk();
   }

   handleCancel() {
      this.props.onCancel();
   };

   render() {
      const { visible, form } = this.props;
      const { getFieldDecorator } = form;

      return(
         <Modal
            title="Additional Search Options"
            visible={ visible }
            onOk={ this.handleOk.bind(this) }
            onCancel={ this.handleCancel.bind(this) }
            maskClosable={false}
         >
            <Form layout="vertical">
               <FormItem label="Title">
                  {getFieldDecorator('title', {
                     rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(
                     <Input />
                  )}
               </FormItem>
               <FormItem label="Description">
                  {getFieldDecorator('description')(<Input type="textarea" />)}
               </FormItem>
               <FormItem className="collection-create-form_last-form-item">
                  {getFieldDecorator('modifier', {
                     initialValue: 'public',
                  })(
                     <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                     </Radio.Group>
                  )}
               </FormItem>
            </Form>
         </Modal>
      );
   }
}

OptionsModalForm.propTypes = {
   onOk: PropTypes.func.isRequired,
   onCancel: PropTypes.func,
   visible: PropTypes.bool,
   value: PropTypes.string,
   onChange: PropTypes.func
};

OptionsModalForm.defaultProps = {
   visible: false
};

export { OptionsModalForm };