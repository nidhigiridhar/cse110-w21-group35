/**
 * @name colorChange
 * @function
 * @description Changes the color of the background and border of timer display when state changes
 */
function colorChange() {
  switch(timer.currState) {
    case WORK_STATE:
      document.body.setAttribute('state',"pomo");
      document.getElementById('timer-display').setAttribute('state',"pomo");
      break;

    case SHORT_STATE:
      document.body.setAttribute('state',"short");
      document.getElementById('timer-display').setAttribute('state',"short");
      break;

    case LONG_STATE:
      document.body.setAttribute('state',"long");
      document.getElementById('timer-display').setAttribute('state',"long");
      break;
      
    default:
      document.body.setAttribute('state',"pomo");
      document.getElementById('timer-display').setAttribute('state',"pomo");
      break;
  }
}

var module = module || {};
module.exports = { colorChange };