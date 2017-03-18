import React, { Component } from 'react';
import { Card, Collapse, Row, Col, Switch } from 'antd';
const Panel = Collapse.Panel;

import SearchForm from './components/SearchForm';



class SearchWidget extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isAdvancedForm: false
      };
   }

   getSwitchValue = () => { return this.state.isAdvancedForm ? 'Advanced' : 'Basic'; };

   handleSwitchChange(checked) {
      const event = window.event;

      event.cancelBubble = true;
      event.stopPropagation();
      event.preventDefault();
      console.log(event);

      this.setState({ isAdvancedForm: checked });
   }

   handleSwitchClick(proxy) {
      const event = window.event;
      console.log(event);
      event.cancelBubble = true;
      event.stopPropagation();
      event.preventDefault();
      console.log(event);
   }

   render() {
      const header = (
         <Row>
            <Col span={12}>Search Form</Col>
            <Col span={1} offset={11} >
               <Switch defaultChecked={false}
                  onChange={ this.handleSwitchChange.bind(this) }
                  checkedChildren={this.getSwitchValue()}
                  unCheckedChildren={this.getSwitchValue()}

               />
            </Col>
         </Row>
      );

      return(
         <Collapse defaultActiveKey={["1"]} >
            <Panel header={header} key="1" >
               <SearchForm isAdvancedForm={this.state.isAdvancedForm}/>
            </Panel>
         </Collapse>
      );
   }
}

export { SearchWidget };