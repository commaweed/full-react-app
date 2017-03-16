import React, { Component } from 'react';
import { Card, Collapse } from 'antd';
const Panel = Collapse.Panel;

import SearchForm from './components/SearchForm';

class SearchWidget extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return(
         <Collapse defaultActiveKey={["1"]}  >
            <Panel header="Search Form" key="1" >
               <SearchForm />
            </Panel>
         </Collapse>
      );
   }
}

export { SearchWidget };