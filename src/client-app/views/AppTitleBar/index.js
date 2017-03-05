import CSSModules from 'react-css-modules';
import { AppTitleBar } from './AppTitleBar.js';
import styles from './AppTitleBar.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';

export default muiThemeable()(CSSModules(AppTitleBar, styles));
