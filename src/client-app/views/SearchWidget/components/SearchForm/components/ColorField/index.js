import CSSModules from 'react-css-modules';
import { ColorField } from './ColorField';
import styles from './ColorField.scss';
import { connect} from "react-redux";

export default connect((store) => {
   const values = store.colorsStore.colors;
   return {
      colors: values,
      defaultValue: values && values.length > 0 ? values[0] : ''
   }
}) (CSSModules(ColorField, styles));
