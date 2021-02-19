const POMO_MINS = 25, SHORT_MINS = 5, LONG_MINS = 15;  
const WORK_STATE = "Work", SHORT_STATE = "Short", LONG_STATE = "Long";

const MS = 1000, NUM_SEC = 60;

const STATE_MOD = 2, LONG_MOD = 4;
        
let timer = {
    timerState : {
        pomoMin: POMO_MINS,
        shortBrk: SHORT_MINS,
        longBrk: LONG_MINS
        },
    counter: {
        stateCtr: 0, // increments after each state is completed
        streak: 0, // increments after work state is completed, gets reset when reset button is pressed
        totalPomos: 0 // increments after work state is completed
        },
    currState: WORK_STATE,
    minutes:POMO_MINS ,
    seconds: NUM_SEC*POMO_MINS
};

var timerId;
    
// call this function when start button is pressed
function onStart() {
    checkState();
    document.getElementById("startButton").disabled = true;
    timerId = setInterval(updateTimer, MS);              
}

function onReset() {
    if (timer.currState === WORK_STATE) {
        clearInterval(timerId);
        document.getElementById("timer-display").innerHTML = `${POMO_MINS}:00`;
    } else if (timer.currState === SHORT_STATE) {
        document.getElementById("timer-display").innerHTML = `${SHORT_MINS}:00`;
    } else {
        document.getElementById("timer-display").innerHTML = `${LONG_MINS}:00`;
    }
    document.getElementById("startButton").disabled = false;
}

function updateTimer(){
    let secTimer = timer.seconds % NUM_SEC; // secs counter that will show up on html page
    if(secTimer < 10 || secTimer == 0){
        document.getElementById("timer-display").innerHTML = `${timer.minutes}:0${secTimer}`;
    } else {
        document.getElementById("timer-display").innerHTML = `${timer.minutes}:${secTimer}`;
    }
    //stops the timer
    if(timer.seconds === 0 && timer.minutes === 0){
        clearInterval(timerId);
        document.getElementById("startButton").disabled = false;
        // increment counters after work session is completed
        if(timer.currState === WORK_STATE){
            timer.counter.streak++;
            timer.counter.totalPomos++;
        }
        timer.counter.stateCtr++; 
        }
    //everytime a minute is passed, the minute counter is decremented
    if(secTimer === 0){
        timer.minutes--;
    }
    timer.seconds--;

}
// check the current state of the timer and set the values for minutes and seconds accordingly
function checkState(){
    // handle initial case for when start is pressed the first time
    if(timer.counter.stateCtr % STATE_MOD === 0) {
        timer.currState = WORK_STATE;
        timer.minutes = POMO_MINS;
        timer.seconds = NUM_SEC * timer.minutes;
        document.getElementById("state").innerHTML = WORK_STATE;     
    } else {
        if(timer.counter.totalPomos % LONG_MOD === 0){    
            timer.currState = LONG_STATE;
            timer.minutes = LONG_MINS;
            timer.seconds = NUM_SEC * timer.minutes;
            document.getElementById("state").innerHTML = LONG_STATE;
        } else {
            
            timer.currState = SHORT_STATE;
            timer.minutes = SHORT_MINS;
            timer.seconds = NUM_SEC * timer.minutes;
            document.getElementById("state").innerHTML = SHORT_STATE;
        }
    }

}

// startButton calls onStart() when clicked
document.getElementById("startButton").addEventListener("click", onStart);
// resetButton calls onReset() when clicked
document.getElementById("resetButton").addEventListener("click", onReset);