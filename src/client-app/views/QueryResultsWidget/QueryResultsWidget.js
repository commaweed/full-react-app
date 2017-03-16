import React, { Component } from 'react';

class QueryResultsWidget extends Component {
   constructor(props) { super(props); }
   render() {
      const { queryResults } = this.props;
      return (
         <div style={{width: '100%', height: '100%' }}>
            <h1> { queryResults }</h1>
         </div>
      );
   }
}
export { QueryResultsWidget };