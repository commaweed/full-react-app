import CSSModules from 'react-css-modules';
import { OptionsModalForm } from './OptionsModalForm';
import styles from './OptionsModalForm.scss';
import { Form } from 'antd';

export default (Form.create()(CSSModules(OptionsModalForm, styles)));
