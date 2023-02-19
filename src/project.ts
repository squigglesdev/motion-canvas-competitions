import {makeProject} from '@motion-canvas/core/lib';

import logo from './scenes/logo?scene'
//import explain from './scenes/explain?scene';
import './global.css';

export default makeProject({
  scenes: [logo],
  background: '#36393f',
});
