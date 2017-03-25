import CSSModules from 'react-css-modules';
import { ResultsPagination } from './ResultsPagination';
import styles from './ResultsPagination.scss';

import { connect } from "react-redux";

export default connect((store) => {
   return {
      queryResults: store.searchFormStore.queryResults,
      fetching: store.searchFormStore.fetching
   }
})(CSSModules(ResultsPagination, styles));
