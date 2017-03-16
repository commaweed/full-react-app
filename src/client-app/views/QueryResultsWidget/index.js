import CSSModules from 'react-css-modules';
import { QueryResultsWidget } from './QueryResultsWidget';
import styles from './QueryResultsWidget.scss';

import { connect } from "react-redux";

export default connect((store) => {
   return { queryResults: store.searchFormStore.queryResults }
})(CSSModules(QueryResultsWidget, styles));
