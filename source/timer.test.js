const {onStart, onReset, checkState, updateState, timer} = require("./timer");
//const {colorChange} = require("./color-change");
//const {getNotificationStatus} = require("./notifications");

describe("Test onStart function", () => {
    test("Check onStart updates state to work state", () => {
        document.body.innerHTML = `
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id="timer-display" state="pomo">25:00</div>
        `;
        timer.counter.stateCtr = 0;
        onStart();
        let state = document.getElementById("state").innerHTML;
        expect(state).toBe("Work State");
    }),

    test("Check onStart disables start button", () => {
        document.body.innerHTML = `
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id="timer-display" state="pomo">25:00</div>
        `;
        onStart();
        let disabled = document.getElementById("startButton").disabled;
        expect(disabled).toBeTruthy();
    }),

    test("Check onStart enables reset button", () => {
        document.body.innerHTML = `
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id="timer-display" state="pomo">25:00</div>
        `;
        onStart();
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeFalsy();
    })
});

describe("Test onReset function", () => {
    test("Check onReset during work state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <h2 id="state">Work State</h2>
        `;
        require("./color-change.js");
        timer.currState = "Work State";
        onReset();
        let timerDisplay = document.getElementById("timer-display").innerHTML;
        let state = document.getElementById("state").innerHTML;
        expect(timerDisplay).toBe("25:00");
        expect(state).toBe("Work State");
    }),

    test("Check onReset enables start button", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <h2 id="state">Work State</h2>
        `;
        require("./color-change.js");
        onReset();
        let disabled = document.getElementById("startButton").disabled;
        expect(disabled).toBeFalsy();
    }),

    test("Check onReset disables reset button", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <h2 id="state">Work State</h2>
        `;
        require("./color-change.js");
        onReset();
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy();
    })
});

describe("Test checkState function", () => {
    test("Check state updates to work state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Work State</h2>
            <div id = "timer-display">25:00</div>
        `;
        require("./color-change.js");
        timer.counter.totalPomos = 0;
        timer.counter.stateCtr = 0;
        checkState();
        let state = document.getElementById("state").innerHTML;
        expect(state).toBe("Work State");
    }),

    test("Check state updates to short break state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id = "timer-display">25:00</div>
        `;
        require("./color-change.js");
        timer.counter.totalPomos = 1;
        timer.counter.stateCtr = 1;
        checkState();
        state = document.getElementById("state").innerHTML;
        expect(state).toBe("Short Break State");
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy(); // reset is disabled during break state
    }),

    test("Check state updates to long break state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id = "timer-display">25:00</div>
        `;
        require("./color-change.js");
        timer.counter.totalPomos = 4;
        timer.counter.stateCtr = 7;
        checkState();
        state = document.getElementById("state").innerHTML;
        expect(state).toBe("Long Break State"); 
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy(); // reset is disabled during break state
    })
});

describe("Test start button", () => {
    test("Check start button works", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
        `;
        require("./timer.js");
        require("./color-change.js");
        let startBtn = document.getElementById("startButton");
        let disabledOrNot = startBtn.disabled;
        expect(disabledOrNot).toBeFalsy;
        startBtn.click();
        expect(disabledOrNot).toBeTruthy;
    })
});

describe("Test reset button", () => {
    test("Check reset button works", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
        `;
        require("./timer.js");
        require("./color-change.js");
        let startBtn = document.getElementById("startButton");
        let disabledOrNot = startBtn.disabled;
        let resetBtn = document.getElementById("resetButton");
        resetBtn.click();
        expect(disabledOrNot).toBeTruthy;
    })
});

// testing updateState function
describe("Test updateState function", () => {
    test("Check if state get set to work if curr state is short break", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
        `;
        require("./timer.js");
        require("./color-change.js");
        timer.currState = "Short Break State";
        updateState();
        let state = timer.currState;
        expect(state).toBe("Work State");
        let htmlState = document.getElementById("state").innerHTML;
        expect(htmlState).toBe("Work State");
        let htmlTime = document.getElementById("timer-display").innerHTML;
        expect(htmlTime).toBe("25:00");
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy();
    }),

    test("Check if state get set to work if curr state is long break", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
        `;
        require("./timer.js");
        require("./color-change.js");
        timer.currState = "Long Break State";
        updateState();
        let state = timer.currState;
        expect(state).toBe("Work State");
        let htmlState = document.getElementById("state").innerHTML;
        expect(htmlState).toBe("Work State");
        let htmlTime = document.getElementById("timer-display").innerHTML;
        expect(htmlTime).toBe("25:00");
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy();
    }),

    test("Check if state get set to short break after work", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
        `;
        require("./timer.js");
        require("./color-change.js");
        timer.counter.totalPomos = 2;
        timer.currState = "Work State";
        updateState();
        let state = timer.currState;
        expect(state).toBe("Short Break State");
        let htmlState = document.getElementById("state").innerHTML;
        expect(htmlState).toBe("Short Break State");
        let htmlTime = document.getElementById("timer-display").innerHTML;
        expect(htmlTime).toBe("5:00");
    }),

    test("Check if state get set to long break after work", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
        `;
        require("./timer.js");
        require("./color-change.js");
        timer.counter.totalPomos = 2;
        timer.currState = "Work State";
        updateState();
        let state = timer.currState;
        expect(state).toBe("Short Break State");
        let htmlState = document.getElementById("state").innerHTML;
        expect(htmlState).toBe("Short Break State");
        let htmlTime = document.getElementById("timer-display").innerHTML;
        expect(htmlTime).toBe("5:00");
    })
});
