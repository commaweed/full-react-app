import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import Measure from 'react-measure';

import ResultsPagination from './components/ResultsPagination';

const columns = [{
   title: 'Name',
   dataIndex: 'name',
}, {
   title: 'Age',
   dataIndex: 'age',
}, {
   title: 'Address',
   dataIndex: 'address',
}];

class QueryResultsWidget extends Component {
   constructor(props) {
      super(props);

      this.state = {

      };
   }

   componentWillReceiveProps(nextProps) {
      // reset the scroll bar to position 0 
      if (this.resultsWrapper && this.resultsWrapper.scrollTop !== 0) {
         this.resultsWrapper.scrollTop = 0;
      }
   }

   render() {
      const { queryResults, fetching } = this.props;

      return (
         <div styleName="wrapper">
            <div styleName="pagination-wrapper">
               <Spin spinning={fetching} size="small">
                  <ResultsPagination/>
               </Spin>
            </div>
            <div styleName="results-wrapper" ref={ (wrapper) => { this.resultsWrapper = wrapper; }}>
               <Spin spinning={fetching} size="large">
                  <Table
                     columns={columns}
                     dataSource={queryResults}
                     showHeader={ false }
                     pagination={ false }
                     loading={ false}
                  />
               </Spin>
            </div>
         </div>
      );
   }
}
export { QueryResultsWidget };