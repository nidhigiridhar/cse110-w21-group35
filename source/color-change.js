import { timer, WORK_STATE, SHORT_STATE, LONG-STATE } from './timer.js';

let state = timer.currState;
state.addEventListener("change", colorChange());

/**
 * 
 * 
 */
function colorChange() {
  switch(state) {
    case WORK_STATE:

    case SHORT_STATE
  }
}