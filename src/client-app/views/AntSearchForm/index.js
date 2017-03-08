import CSSModules from 'react-css-modules';
import { AntSearchForm } from './AntSearchForm';
import styles from './AntSearchForm.scss';
import {Form} from 'antd';

export default Form.create()(CSSModules(AntSearchForm, styles));
