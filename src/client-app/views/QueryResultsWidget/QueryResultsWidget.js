import React, { Component } from 'react';
import { Table } from 'antd';
import Measure from 'react-measure';

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

   render() {
      const { queryResults, fetching } = this.props;

      return (

         <div styleName="results-wrapper">
            <Table
               ref={ (table) => { this.resultsTable = table; }}
               columns={columns}
               dataSource={queryResults}
               showHeader={false}
               loading={fetching}
               bodyStyle={{ backgroundColor: '#EEEEEE', overflow: 'auto', maxHeight: 400 }}
               pagination={{ pageSize: 30 }}
               styleName='table-styles'
            />
         </div>
      );
   }
}
export { QueryResultsWidget };