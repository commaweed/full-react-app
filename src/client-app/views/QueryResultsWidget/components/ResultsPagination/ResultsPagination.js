import React, { Component } from 'react';
import { Pagination } from 'antd';

class ResultsPagination extends Component {
   constructor(props) {
      super(props);

      this.state = {
         currentPage: 1
      };
   }

   render() {
      const { queryResults, fetching } = this.props;
      const { currentPage } = this.state;

      return (
         <Pagination
            styleName="pagination"
            size="large"
            defaultCurrent={1}
            current={1}
            total={queryResults.length}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={40}
         />
      );
   }
}
export { ResultsPagination };