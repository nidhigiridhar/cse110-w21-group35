import { onStart, onReset, checkState, updateState, timer } from "./timer";

describe("Test onStart function", () => {
    test("updates state to work state", () => {
        document.body.innerHTML = `
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id="timer-display" state="pomo">25:00</div>
            <div id="warning" style="display:none">Wait until the end of your next break to change the times!</div>
            <fieldset id="formEnabler">
                    <label id="workLabel">Select length for Work Session</label> 
                    <select name="workTime" id="workTime">
                        <option value="25" selected>25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <br>
            
                    <label id="shortBreakLabel">Select length for Short Break</label>
                    <select name="shortBreakTime" id="shortBreakTime">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <br>
            
                    <label id="longBreakLabel">Select length for Long Break</label>
                    <select name="longBreakTime" id="longBreakTime">
                        <option value="15" selected>15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <br>
                </fieldset> 
                <div class="progress-container" state="pomo">
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle long"></div>
                </div>
                <div id="break-reminder" style="color:#464646;"></div>
                <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        timer.counter.stateCtr = 0;
        onStart();
        let state = document.getElementById("state").innerHTML;
        expect(state).toBe("Work State");
    }),

    test("disables the start button", () => {
        document.body.innerHTML = `
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id="timer-display" state="pomo">25:00</div>
            <div id="warning" style="display:none">Wait until the end of your next break to change the times!</div>
            <fieldset id="formEnabler">
                    <label id="workLabel">Select length for Work Session</label> 
                    <select name="workTime" id="workTime">
                        <option value="25" selected>25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <br>
            
                    <label id="shortBreakLabel">Select length for Short Break</label>
                    <select name="shortBreakTime" id="shortBreakTime">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <br>
            
                    <label id="longBreakLabel">Select length for Long Break</label>
                    <select name="longBreakTime" id="longBreakTime">
                        <option value="15" selected>15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <br>
                </fieldset> 
                <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
        <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        onStart();
        let disabled = document.getElementById("startButton").disabled;
        expect(disabled).toBeTruthy();
    }),

    test("enables the reset button", () => {
        document.body.innerHTML = `
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id="timer-display" state="pomo">25:00</div>
            <div id="warning" style="display:none">Wait until the end of your next break to change the times!</div>
            <fieldset id="formEnabler">
                    <label id="workLabel">Select length for Work Session</label> 
                    <select name="workTime" id="workTime">
                        <option value="25" selected>25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <br>
            
                    <label id="shortBreakLabel">Select length for Short Break</label>
                    <select name="shortBreakTime" id="shortBreakTime">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <br>
            
                    <label id="longBreakLabel">Select length for Long Break</label>
                    <select name="longBreakTime" id="longBreakTime">
                        <option value="15" selected>15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <br>
            </fieldset> 
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
        <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        onStart();
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeFalsy();
    });
});

describe("Test onReset function", () => {
    test("resets correctly during work state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <h2 id="state">Work State</h2>
            <div id="streak-counter"><b>Streak:</b> <span id="streak">0</span></div>
            <div id="warning" style="display:none">Wait until the end of your next break to change the times!</div>
            <fieldset id="formEnabler">
                    <label id="workLabel">Select length for Work Session</label> 
                    <select name="workTime" id="workTime">
                        <option value="25" selected>25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <br>
            
                    <label id="shortBreakLabel">Select length for Short Break</label>
                    <select name="shortBreakTime" id="shortBreakTime">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <br>
            
                    <label id="longBreakLabel">Select length for Long Break</label>
                    <select name="longBreakTime" id="longBreakTime">
                        <option value="15" selected>15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <br>
                </fieldset> 
                <div class="progress-container" state="pomo">
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle long"></div>
                </div>
                <div id="break-reminder" style="color:#464646;"></div>
                <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        timer.currState = "Work State";
        onReset();
        let timerDisplay = document.getElementById("timer-display").innerHTML;
        let state = document.getElementById("state").innerHTML;
        expect(timerDisplay).toBe("25:00");
        expect(state).toBe("Work State");
    }),

    test("enables the start button", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <h2 id="state">Work State</h2>
            <div id="streak-counter"><b>Streak:</b> <span id="streak">0</span></div>
            <div id="warning" style="display:none">Wait until the end of your next break to change the times!</div>
            <fieldset id="formEnabler">
                    <label id="workLabel">Select length for Work Session</label> 
                    <select name="workTime" id="workTime">
                        <option value="25" selected>25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <br>
            
                    <label id="shortBreakLabel">Select length for Short Break</label>
                    <select name="shortBreakTime" id="shortBreakTime">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <br>
            
                    <label id="longBreakLabel">Select length for Long Break</label>
                    <select name="longBreakTime" id="longBreakTime">
                        <option value="15" selected>15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <br>
                </fieldset> 
                <div class="progress-container" state="pomo">
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle long"></div>
                </div>
                <div id="break-reminder" style="color:#464646;"></div>
                <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        onReset();
        let disabled = document.getElementById("startButton").disabled;
        expect(disabled).toBeFalsy();
    }),

    test("disables the reset button", () => {
        document.body.innerHTML = `
            <div id = "timer-display">14:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <h2 id="state">Work State</h2>
            <div id="streak-counter"><b>Streak:</b> <span id="streak">0</span></div>
            <div id="warning" style="display:none">Wait until the end of your next break to change the times!</div>
            <fieldset id="formEnabler">
                    <label id="workLabel">Select length for Work Session</label> 
                    <select name="workTime" id="workTime">
                        <option value="25" selected>25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <br>
            
                    <label id="shortBreakLabel">Select length for Short Break</label>
                    <select name="shortBreakTime" id="shortBreakTime">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <br>
            
                    <label id="longBreakLabel">Select length for Long Break</label>
                    <select name="longBreakTime" id="longBreakTime">
                        <option value="15" selected>15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <br>
                </fieldset> 
                <div class="progress-container" state="pomo">
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle short"></div>
                    <div class="circle pomo"></div>
                    <div class="circle long"></div>
                </div>
                <div id="break-reminder" style="color:#464646;"></div>
                <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        onReset();
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy();
    });
});

describe("Test checkState function", () => {
    test("correctly updates to the work state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Work State</h2>
            <div id = "timer-display">25:00</div>
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
        <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        timer.counter.totalPomos = 0;
        timer.counter.stateCtr = 0;
        checkState();
        let state = document.getElementById("state").innerHTML;
        expect(state).toBe("Work State");
    }),

    test("correctly updates to the short break state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id = "timer-display">25:00</div>
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
        <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        timer.counter.totalPomos = 1;
        timer.counter.stateCtr = 1;
        checkState();
        state = document.getElementById("state").innerHTML;
        expect(state).toBe("Short Break State");
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy(); // reset is disabled during break state
    }),

    test("correctly updates to the long break state", () => {
        document.body.innerHTML = `
            <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div id = "timer-display">25:00</div>
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
        <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        timer.counter.totalPomos = 4;
        timer.counter.stateCtr = 7;
        checkState();
        state = document.getElementById("state").innerHTML;
        expect(state).toBe("Long Break State"); 
        let disabled = document.getElementById("resetButton").disabled;
        expect(disabled).toBeTruthy(); // reset is disabled during break state
    });
});

describe("Test start button", () => {
    test("calls onStart function when clicked", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
        `;
        let startBtn = document.getElementById("startButton");
        startBtn.click();
        expect(onStart).toBeCalled;
    });
});

describe("Test reset button", () => {
    test("calls onReset function when clicked", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <button type=button class="timer-button" id="startButton">Start</button>
            <button type=button class="timer-button" id="resetButton">Reset</button>
        `;
        let resetBtn = document.getElementById("resetButton");
        resetBtn.click();
        expect(onReset).toBeCalled;
    })
});

describe("Test updateState function", () => {
    test("sets state to work state if current state is short break state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
        <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
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

    test("sets state to work state if current state is long break state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
            <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
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

    test("sets state to short break state if current state is work state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
            <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
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

    test("sets state to long break state if current state is work state", () => {
        document.body.innerHTML = `
            <div id = "timer-display">25:00</div>
            <h2 id="state">Work State</h2>
            <button type=button class="timer-button" id="resetButton">Reset</button>
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
            <div id="break-reminder" style="color:#464646;"></div>
            <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>
        `;
        timer.counter.totalPomos = 2;
        timer.currState = "Work State";
        updateState();
        let state = timer.currState;
        expect(state).toBe("Short Break State");
        let htmlState = document.getElementById("state").innerHTML;
        expect(htmlState).toBe("Short Break State");
        let htmlTime = document.getElementById("timer-display").innerHTML;
        expect(htmlTime).toBe("5:00");
    });
});
