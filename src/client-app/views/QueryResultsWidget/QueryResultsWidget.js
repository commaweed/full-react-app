import React, { Component } from 'react';
import { Table } from 'antd';

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
               columns={columns}
               dataSource={queryResults}
               showHeader={false}
               loading={fetching}
               bodyStyle={{ backgroundColor: '#EEEEEE', overflowY: 'auto', maxHeight: 500 }}
               pagination={{ pageSize: 30 }}
            />
         </div>

      );
   }
}
export { QueryResultsWidget };