import React, { Component } from 'react';
import { Pagination } from 'antd';

class ResultsPagination extends Component {
   constructor(props) {
      super(props);

      this.state = {
         currentPage: 1,
         pageSize: 40
      };
   }

   getMaxCurrent(total) {
      const { currentPage, pageSize } = this.state;
      if ((currentPage - 1) * pageSize >= total) {
         return Math.floor((total - 1) / pageSize) + 1;
      }
      return currentPage;
   }

   handlePageChange(current) {
      this.setState({ currentPage: current});
   }

   render() {
      const { queryResults, fetching } = this.props;
      const { currentPage } = this.state;

      return (
         <Pagination
            styleName="pagination"
            size="large"
            defaultCurrent={1}
            current={this.getMaxCurrent(queryResults.length)}
            total={queryResults.length}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={this.state.pageSize}
            onChange={this.handlePageChange.bind(this)}
         />
      );
   }
}
export { ResultsPagination };