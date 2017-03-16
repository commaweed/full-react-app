import CSSModules from 'react-css-modules';
import { Logo } from './Logo.js';
import styles from './Logo.scss';
import GSAP from 'react-gsap-enhancer';

export default GSAP()(CSSModules(Logo, styles, { allowMultiple: true }));