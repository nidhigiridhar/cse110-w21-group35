//const { getNotificationStatus } = require("./notifications.js");

//const { showNotif } = require("./notifications");

//import { colorChange } from './color-change.js';

const POMO_MINS = 25, SHORT_MINS = 5, LONG_MINS = 15;
const WORK_STATE = "Work State", SHORT_STATE = "Short Break State", 
    LONG_STATE = "Long Break State";

const MS = 1000, NUM_SEC = 60;

const STATE_MOD = 2, LONG_MOD = 4;

var timerId; // stores the setInterval

// timer object
let timer = {
    timerState: {
        pomoMin: POMO_MINS,
        shortBrk: SHORT_MINS,
        longBrk: LONG_MINS
    },
    counter: {
        stateCtr: 0, // increments after each state is completed
        streak: 0, // increments after work state is completed, gets reset 
                   // when reset button is pressed
        totalPomos: 0 // increments after work state is completed
    },
    currState: WORK_STATE,
    currDuration: POMO_MINS * NUM_SEC,
};

/**
 * Function name: checkState
 * Description: Checks what state the user is currently in. The display and the
 * timer duration are updated accordingly
 */
function checkState() {

    // work state
    if (timer.counter.stateCtr % STATE_MOD === 0) {
        timer.currState = WORK_STATE;
        timer.currDuration = NUM_SEC * POMO_MINS;
        document.getElementById("state").innerHTML = WORK_STATE;
        document.getElementById("timer-display").innerHTML = `${POMO_MINS}:00`;
    } 
    else {
        // long break state
        if (timer.counter.totalPomos % LONG_MOD === 0) {
            timer.currState = LONG_STATE;
            timer.currDuration = NUM_SEC * LONG_MINS;
            document.getElementById("state").innerHTML = LONG_STATE;
            document.getElementById("timer-display").innerHTML = 
                `${LONG_MINS}:00`;
            // disable reset button in break state
            document.getElementById("resetButton").disabled = true; 
        } 
        // short break state
        else {
            timer.currState = SHORT_STATE;
            timer.currDuration = NUM_SEC * SHORT_MINS;
            document.getElementById("state").innerHTML = SHORT_STATE;
            document.getElementById("timer-display").innerHTML = 
                `${SHORT_MINS}:00`;
            // disable reset button in break state
            document.getElementById("resetButton").disabled = true; 
        }
    }
    // change screen color for different states
    colorChange();         
}

/**
 * Function name: updateState
 * Description: updates the state on the display to reflect the next state
 * after the timer ends for the current session. 
 */
function updateState() {
    // if current state is work, next state is one of the breaks
    if(timer.currState === WORK_STATE) {
        // if next state is long break 
        if(timer.counter.totalPomos % LONG_MOD === 0) {
            timer.currState = LONG_STATE;
            document.getElementById("state").innerHTML = LONG_STATE;
            document.getElementById("timer-display").innerHTML = 
                `${LONG_MINS}:00`;
        }
        // if next state is short break 
        else {
            timer.currState = SHORT_STATE;
            document.getElementById("state").innerHTML = SHORT_STATE;
            document.getElementById("timer-display").innerHTML = 
                `${SHORT_MINS}:00`;
            // disable reset button in break state
            document.getElementById("resetButton").disabled = true; 

        }
    }
    // if current state is a break, next state will be work
    else {
        timer.currState = WORK_STATE;
        document.getElementById("state").innerHTML = WORK_STATE;
        document.getElementById("timer-display").innerHTML = `${POMO_MINS}:00`;
        // disable reset button in break state
        document.getElementById("resetButton").disabled = true; 
    }
    // change screen color for different states
    colorChange();     
}

/**
 * Function name: updateTimer
 * Description: Decrements the timer down to 0
 */
function updateTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timerCountdown() {
        // get the number of seconds that have elapsed since updateTimer() 
        // was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        // add extra 0 to minutes/seconds if they are less than 10
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //console.log(minutes + ':' + seconds);
        document.getElementById("timer-display").innerHTML = 
            `${minutes}:${seconds}`;

        // stop timer when minutes and seconds reach 0
        if(minutes == 0 && seconds == 0) {
            clearInterval(timerId);

            // if curr state is work, update the streak and total pomo timers
            if(timer.currState === WORK_STATE){                
                timer.counter.streak++;
                document.getElementById("streak").innerHTML = 
                    timer.counter.streak;
        
                timer.counter.totalPomos++;
                document.getElementById("total").innerHTML = 
                    timer.counter.totalPomos;
            }
            // enable start button after timer ends
            document.getElementById("startButton").disabled = false; 
            timer.counter.stateCtr++; 

            // transition to the next state
            updateState();
            showNotif(timer.currState);
            playSound();
        }

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timerCountdown();
    // fire set interval often to give enough time to update
    timerId = setInterval(timerCountdown, 10); 
}

/**
 * @name onStart
 * @description Begins the timer when the start button is clicked
 */
function onStart() {
    getNotificationStatus();
    // disable start button after pressed
    document.getElementById("startButton").disabled = true; 
    //enable reset button
    document.getElementById("resetButton").disabled = false; 
    checkState(); // set the correct state 
    updateTimer(timer.currDuration); // start the timer
}

/**
 * @name onReset
 * @description Resets the timer to its original state when the reset button is clicked
 */
function onReset() {
    document.getElementById("resetButton").disabled = true;
    document.getElementById("startButton").disabled = false;
    timer.counter.streak = 0;
    clearInterval(timerId);
    checkState();
}

// event handlers for clicking the start and reset buttons
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("startButton").addEventListener("click", onStart);
    document.getElementById("resetButton").addEventListener("click", onReset);
});

// export functions and variables for testing
var module = module || {};
module.exports = {onStart, onReset, checkState,updateState, timer }; 

