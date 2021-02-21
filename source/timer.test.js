const {onStart, onReset, checkState, timer, timerId} = require("./timer");

describe("Test onStart function", () => {
    test("Check onStart updates state to work state", () => {
        document.body.innerHTML = `
            <h2 id="state">Idle Mode</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
        `;
        timer.counter.stateCtr = 0;
        onStart();
        let state = document.getElementById("state").innerHTML;
        expect(state).toBe("Work");
    }),

    test("Check onStart disables start button", () => {
        document.body.innerHTML = `
            <h2 id="state">Idle Mode</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
        `;
        onStart();
        let disabled = document.getElementById("startButton").disabled;
        expect(disabled).toBeTruthy();
    })
});

describe("Test onReset function", () => {
    test("Check onReset during work state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <h2 id="state">Idle Mode</h2>
        `;
        timer.currState = "Work";
        onReset();
        let timerDisplay = document.getElementById("timer-display").innerHTML;
        let state = document.getElementById("state").innerHTML;
        expect(timerDisplay).toBe("25:00");
        expect(state).toBe("Idle");
    }),

    test("Check onReset during short break state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <h2 id="state">Idle Mode</h2>
        `;
        timer.currState = "Short";
        onReset();
        let timerDisplay = document.getElementById("timer-display").innerHTML;
        let state = document.getElementById("state").innerHTML;
        expect(timerDisplay).toBe("5:00");
        expect(state).toBe("Idle");
    }),

    test("Check onReset during long break state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <h2 id="state">Idle Mode</h2>
        `;
        timer.currState = "Long";
        onReset();
        let timerDisplay = document.getElementById("timer-display").innerHTML;
        let state = document.getElementById("state").innerHTML;
        expect(timerDisplay).toBe("15:00");
        expect(state).toBe("Idle");
    })

    test("Check onReset disables enables start button", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <h2 id="state">Idle Mode</h2>
        `;
        onReset();
        let disabled = document.getElementById("startButton").disabled;
        expect(disabled).toBeFalsy();
    })
});

describe("Test checkState function", () => {
    test("Check state updates to work state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Idle Mode</h2>
        `;
        timer.counter.totalPomos = 0;
        timer.counter.stateCtr = 0;
        checkState();
        let state = document.getElementById("state").innerHTML;
        expect(state).toBe("Work");
    }),

    test("Check state updates to short break state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Idle Mode</h2>
        `;
        timer.counter.totalPomos = 1;
        timer.counter.stateCtr = 1;
        checkState();
        state = document.getElementById("state").innerHTML;
        expect(state).toBe("Short");
    }),

    test("Check state updates to long break state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Idle Mode</h2>
        `;
        timer.counter.totalPomos = 4;
        timer.counter.stateCtr = 7;
        checkState();
        state = document.getElementById("state").innerHTML;
        expect(state).toBe("Long"); 
    })
});

describe("Test start button", () => {
    test("Check start button works", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
        `;
        require("./timer.js");
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
        let startBtn = document.getElementById("startButton");
        let disabledOrNot = startBtn.disabled;
        let resetBtn = document.getElementById("resetButton");
        resetBtn.click();
        expect(disabledOrNot).toBeTruthy;
    })
});
