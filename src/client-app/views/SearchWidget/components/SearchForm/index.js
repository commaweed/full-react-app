import CSSModules from 'react-css-modules';
import { SearchForm } from './SearchForm';
import styles from './SearchForm.scss';
import { Form } from 'antd';
import { connect } from "react-redux";

export default connect()(Form.create()(CSSModules(SearchForm, styles)));
