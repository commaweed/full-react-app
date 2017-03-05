import CSSModules from 'react-css-modules';
import { ToolBar } from './ToolBar.js';
import styles from './ToolBar.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';

export default muiThemeable()(CSSModules(ToolBar, styles));
