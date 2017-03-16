import React, { Component, PropTypes } from 'react';

import { Card, Switch} from 'antd';

import AntSearchForm from '../../../AntSearchForm';

import { Collapse } from 'antd';
const Panel = Collapse.Panel;

function callback(key) {
   console.log(key);
}

class ToolBar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         checked: false
      };
   }

   handleOnToggle(checked) {
      this.setState({checked: checked });
   }

   render() {
      const { checked } = this.state;

      return (
         <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="Search Form" key="1">
               <Card bordered={true} style={{ height: 300 }}>
                  <AntSearchForm/>
                  <Switch
                     checkedChildren={ checked ? 'Basic' : 'Advanced' }
                     unCheckedChildren={ checked ? 'Advanced' : 'Basic' }
                     onChange={this.handleOnToggle.bind(this)}
                  />
               </Card>
            </Panel>
         </Collapse>

      );
   }
}

ToolBar.propTypes = {
   onExpandChange: PropTypes.func
};

export { ToolBar };
