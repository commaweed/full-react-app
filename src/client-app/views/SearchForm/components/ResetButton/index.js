import CSSModules from 'react-css-modules';
import { ResetButton } from './ResetButton.js';
import styles from './ResetButton.scss';
import muiThemeable from 'material-ui/styles/muiThemeable';

export default muiThemeable()(CSSModules(ResetButton, styles, { allowMultiple: true }));
