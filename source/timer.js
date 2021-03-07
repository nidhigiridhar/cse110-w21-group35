//const { getNotificationStatus } = require("./notifications.js");

//const { showNotif } = require("./notifications");

import { colorChange } from './color-change.js';
import { showNotif, getNotificationStatus, playSound, getAlarm } from "./notifications.js";
import { breakReminders } from "./breakReminder.js";
import { progressBar } from "./progress-bar.js";

let 
    /** @type {number} **/ 
    POMO_MINS = 25, 
    /** @type {number} **/ 
    SHORT_MINS = 5, 
    /** @type {number} **/ 
    LONG_MINS = 15;

const 
    /** @constant @type {string} **/ 
    WORK_STATE = "Work State", 
    /** @constant @type {string} **/ 
    SHORT_STATE = "Short Break State", 
    /** @constant @type {string} **/ 
    LONG_STATE = "Long Break State";

const 
    /** @constant @type {number} */
    MS = 1000,
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
    progressBar();     
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
        diff = duration - (((Date.now() - start) / MS) | 0);
        // does the same job as parseInt truncates the float
        minutes = (diff / NUM_SEC) | 0;
        seconds = (diff % NUM_SEC) | 0;
        // add extra 0 to minutes/seconds if they are less than 10
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //console.log(minutes + ':' + seconds);
        document.getElementById("timer-display").innerText= 
            `${minutes}:${seconds}`;

        // stop timer when minutes and seconds reach 0
        if(minutes == 0 && seconds == 0) {
            clearInterval(timerId);

            // if curr state is work, update the streak and total pomo timers
            if(timer.currState === WORK_STATE){                
                timer.counter.streak++;
                document.getElementById("streak").innerText = 
                    timer.counter.streak;
        
                timer.counter.totalPomos++;
                document.getElementById("total").innerText = 
                    timer.counter.totalPomos;
            } else {
                document.querySelector("#formEnabler").removeAttribute('disabled');
            }
            // enable start button after timer ends
            document.getElementById("startButton").disabled = false; 
            timer.counter.stateCtr++; 

            // transition to the next state
            updateState();
            showNotif(timer.currState);
            if(document.getElementById("notifToggle").checked) {
                playSound();
            }
        }
        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    }
    // we don't want to wait a full second before the timer starts
    timerCountdown();
    // fire set interval often to give enough time to update
    timerId = setInterval(timerCountdown, 10); 
}

/**
 * @name setCustomTime
 * @description Changes the times for each session based on user input
 */
function setCustomTime() {
    let wTime = document.getElementById("workTime");
    let sbTime = document.getElementById("shortBreakTime");
    let lbTime = document.getElementById("longBreakTime");
    let warning = document.getElementById("warning");

    // check if the pomo duration is longer than the break durations
    if(Number(wTime.options[wTime.selectedIndex].text) <= Number(sbTime.options[sbTime.selectedIndex].text) ||
        Number(wTime.options[wTime.selectedIndex].text) <= Number(lbTime.options[lbTime.selectedIndex].text)){
            // enable a warning stating invalid inputs
            warning.innerText = 'Work Periods must be greater than Break Periods';
            warning.style.display = 'block';

            // keep the drop down values the same as the current timer settings
            wTime.value = POMO_MINS.toString();
            sbTime.value = SHORT_MINS.toString();
            lbTime.value = LONG_MINS.toString();
            return;
    }
    // otherwise do not display a warning
    warning.style.display = 'none';

    // set the new time preferences
    POMO_MINS = wTime.options[wTime.selectedIndex].text;
    document.getElementById("timer-display").innerText = `${POMO_MINS}:00`;

    
    SHORT_MINS = sbTime.options[sbTime.selectedIndex].text;
    LONG_MINS = lbTime.options[lbTime.selectedIndex].text;  
}

/**
 * @name onStart
 * @function
 * @description Begins the timer when the start button is clicked
 */
function onStart() {
    console.log(POMO_MINS);
    getNotificationStatus();
    document.querySelector("#formEnabler").disabled = 'disabled';
    // enable a warning if the user tries changing the time limits during a pomo
    document.getElementById("warning").innerText = 'Wait until the end of your next break to change the times!';
    document.getElementById("warning").style.display = 'block'; 
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
    document.getElementById("formEnabler").removeAttribute('disabled');
    timer.counter.streak = 0;
    document.getElementById("streak").innerHTML = 
                    timer.counter.streak;
    clearInterval(timerId);
    checkState();
}

/**
 * @name revealSettings
 * @function
 * @description Opens the settings modal when the settings button is clicked
 */
function revealSettings() {
    let settingsModal = document.getElementById("settingsModal");
    settingsModal.style.display = "block";
    document.getElementById("settingsButton").disabled = true; 
    document.getElementById("closeSettings").disabled = false; 
}

/**
 * @name hideSettings
 * @description Closes the settings modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 * @param {*} event The state of the settings modal (open or closed)
 */
function hideSettings(event) {
    let settingsModal = document.getElementById("settingsModal");
    settingsModal.style.display = "none";
    document.getElementById("settingsButton").disabled = false; 
    document.getElementById("closeSettings").disabled = true; 
}

/**
 * @name keyboardShortcut
 * @function
 * @description Starts and resets timer when the space bar is clicked
 * @param {*} event The keyboard button that is clicked
 */
function keyboardShortcut(event) {
    if (document.getElementById('keyboardToggle').checked){
        if(event.code === 'Space') {
            // if the timer is static --> start timer
            if(document.getElementById("startButton").disabled == false ) {
                onStart();
            }
            // if timer is running --> reset timer
            else {
                if(timer.currState === WORK_STATE) {
                    onReset();
                }
            }
        }
    }
}

// export functions and variables for testing
var module = module || {};
export {onStart, onReset, checkState,updateState, timer, setCustomTime, keyboardShortcut, revealSettings, hideSettings, SHORT_STATE, LONG_STATE, WORK_STATE}; 

