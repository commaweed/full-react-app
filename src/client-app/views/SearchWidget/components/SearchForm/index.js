import CSSModules from 'react-css-modules';
import { SearchForm } from './SearchForm';
import styles from './SearchForm.scss';
import { Form } from 'antd';
import { connect } from "react-redux";

export default connect((store) => {
   return {
      fetching: store.searchFormStore.fetching
   }
})(Form.create()(CSSModules(SearchForm, styles)));
