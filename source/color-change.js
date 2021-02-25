
/**
 * Name: colorChange
 * Description: Changes the color of the background and border of timer display when state changes
 */
function colorChange() {
  switch(timer.currState) {
    case WORK_STATE:
      document.body.setAttribute('state',"pomo");
      document.body.style.backgroundColor = "#a9c7f5";
      break;
    case SHORT_STATE:
      document.body.setAttribute('state',"short");
      document.body.style.backgroundColor = "#eaa478";
      break;
    case LONG_STATE:
      document.body.setAttribute('state',"long");
      document.body.style.backgroundColor = "#88b9ae";
      break;
    default:
      document.body.setAttribute('state',"pomo");
      break;
  }
}

module.exports = { colorChange };