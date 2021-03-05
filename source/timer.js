//const { getNotificationStatus } = require("./notifications.js");

//const { showNotif } = require("./notifications");

//import { colorChange } from './color-change.js';

const 
    /** @constant @type {number} **/ 
    POMO_MINS = 25, 
    /** @constant @type {number} **/ 
    SHORT_MINS = 5, 
    /** @constant @type {number} **/ 
    LONG_MINS = 15;

const 
    /** @constant @type {string} **/ 
    WORK_STATE = "Work State", 
    /** @constant @type {string} **/ 
    SHORT_STATE = "Short Break State", 
    /** @constant @type {string} **/ 
    LONG_STATE = "Long Break State";

const 
    /** @constant @type {number} **/ 
    NUM_SEC = 60;

const 
    /** @constant @type {number} **/ 
    STATE_MOD = 2,
    /** @constant @type {string} **/ 
    LONG_MOD = 4;

/** 
 * Stores the set interval
 * @type {number} 
 */
let timerId;

/**
 * A timer
 * @typedef {object} Timer
 * @property {object} timerState            - The timerState values for the timer
 * @property {number} timerState.pomoMin    - The duration of one pomo (in minutes)
 * @property {number} timerState.shortBrk   - The duration of one short break (in minutes)
 * @property {number} timerState.longBrk    - The duration of one long break (in minutes)
 * @property {object} counter               - The counter values for the timer
 * @property {number} counter.stateCtr      - The number states the timer has cycled through
 * @property {number} counter.streak        - The number of pomos completed in a row without clicking reset
 * @property {number} counter.totalPomos    - The total number of pomos completed overall
 * @property {string} currState             - The current state of timer displayed to the user
 * @property {number} currDuration          - The total number of seconds the timer should run
 */
let timer = {
    timerState: {
        pomoMin: POMO_MINS,
        shortBrk: SHORT_MINS,
        longBrk: LONG_MINS
    },
    counter: {
        stateCtr: 0,
        streak: 0,
        totalPomos: 0
    },
    currState: WORK_STATE,
    currDuration: POMO_MINS * NUM_SEC,
};

/**
 * @name checkState
 * @function
 * @description Checks the current state and updates the timer display and duration accordingly
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
    breakReminders();         
}

/**
 * @name updateState
 * @function
 * @description Updates the state on display after the timer for the current state ends
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
 * @name updateTimer
 * @function
 * @description Decrements the timer down to 0
 * @param {number} duration The total number of seconds the timer should run
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
 * @function
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
 * @function
 * @description Resets the timer to the beginning of its current state when the reset button is clicked
 */
function onReset() {
    document.getElementById("resetButton").disabled = true;
    document.getElementById("startButton").disabled = false;
    timer.counter.streak = 0;
    document.getElementById("streak").innerHTML = 
                    timer.counter.streak;
    clearInterval(timerId);
    checkState();
}

/**
 * @name keyboardShortcut
 * @function
 * @description Starts and resets timer when the space bar is clicked
 * @param {*} event The keyboard button that is clicked
 */
function keyboardShortcut(event) {
    if(event.code === 'Space' ) {
        // if the timer is static --> start timer
        if(document.getElementById("startButton").disabled == false ) {
            onStart();
        }
        // if timer is running --> reset timer
        else {
            onReset();
        }
    }
}

// export functions and variables for testing
var module = module || {};
module.exports = {onStart, onReset, checkState,updateState, timer }; 

