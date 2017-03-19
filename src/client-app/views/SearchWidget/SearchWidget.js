import React, { Component } from 'react';
import { Card, Collapse, Row, Col, Switch } from 'antd';
const Panel = Collapse.Panel;

import SearchForm from './components/SearchForm';

class SearchWidget extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isAdvancedForm: false,
         isCollapsed: false
      };
   }

   getSwitchValue = () => { return this.state.isAdvancedForm ? 'Advanced' : 'Basic'; };

   handleSwitchChange(checked) {
      this.setState({ isAdvancedForm: checked, isCollapsed: false });
      console.log(this.state.isCollapsed);
   }

   onCollapseClick(event) {
      this.setState({ isCollapsed: !this.state.isCollapsed });
   }

   onSwitchClick(event) {
      event.stopPropagation();
      event.preventDefault();
   }

   render() {
      const header = (
         <Row>
            <Col span={12}>Search Form</Col>
            <Col span={1} offset={11} onClick={this.onSwitchClick.bind(this)} >
               <Switch defaultChecked={false}
                  onChange={ this.handleSwitchChange.bind(this) }
                  checkedChildren={this.getSwitchValue()}
                  unCheckedChildren={this.getSwitchValue()}
               />
            </Col>
         </Row>
      );

      return(
         <Collapse activeKey={ this.state.isCollapsed ? [] : ["1"] } onChange={this.onCollapseClick.bind(this)}>
            <Panel header={header} key="1" onClick={this.onCollapseClick.bind(this)}>
               <SearchForm isAdvancedForm={this.state.isAdvancedForm}/>
            </Panel>
         </Collapse>
      );
   }
}

export { SearchWidget };