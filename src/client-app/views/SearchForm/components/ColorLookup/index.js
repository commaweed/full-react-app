import CSSModules from 'react-css-modules';
import { ColorLookup } from './ColorLookup.js';
import styles from './ColorLookup.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';

export default muiThemeable()(CSSModules(ColorLookup, styles));
