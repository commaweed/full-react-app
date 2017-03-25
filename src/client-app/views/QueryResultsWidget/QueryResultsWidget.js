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

   componentDidMount() {
      //this.remeasure();
      //this.remeasure.flush();
      //window.addEventListener('resize', this.remeasure);
   }
   componentWillReceiveProps(nextProps) {
      console.log("before", this.resultsTable.scrollTop);
      this.resultsTable.scrollTop = 0;
      console.log("after", this.resultsTable.scrollTop);
      //if (!shallowEqual(this.props.domProps, nextProps.domProps) ||
      //   !shallowEqual(this.props.computedStyleProps, nextProps.computedStyleProps)) {
      //   this.remeasure();
      //}
   }
   componentWillUnmount() {
      //this.remeasure.cancel();
      //window.removeEventListener('resize', this.remeasure);
   }

   //bodyStyle={{ backgroundColor: '#EEEEEE', overflow: 'auto', maxHeight: 400 }}
   // styleName='table-styles'
   render() {
      const { queryResults, fetching } = this.props;

      return (
         <Spin spinning={fetching}>
            <ResultsPagination />
            <div styleName="results-wrapper" style={{ height: 500 }}>
               <Table
                  ref={ (table) => { this.resultsTable = table; }}
                  columns={columns}
                  dataSource={queryResults}
                  showHeader={ false }
                  pagination={ false }
                  loading={ false}
               />
            </div>
         </Spin>
      );
   }
}
export { QueryResultsWidget };