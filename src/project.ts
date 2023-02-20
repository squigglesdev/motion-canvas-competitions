import {makeProject} from '@motion-canvas/core/lib';

//import logo from './scenes/logo?scene'
import mcc from './scenes/mcc?scene'
//import explain from './scenes/explain?scene';
import './global.css';

export default makeProject({
  scenes: [mcc],
  background: '#242424',
});
