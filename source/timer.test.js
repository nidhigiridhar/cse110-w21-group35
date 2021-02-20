// to use variables and functions from timer.js, we can use the following format and name them inside
// the curly braces
// the name of the js file goes inside of the require function
// the following statement must match the last line of the timer.js (see line 110)
const {checkState, timer} = require("./timer");

test("Check checkState current state", () => {
    // (i think?) this is dom manipulation chad was talking about
    // we have to copy and paste the html elements we are testing or we'll get a null error
    document.body.innerHTML = `
        <div id="total-counter">Total Pomos Completed: <span id="total">0</span></div>
        <h2 id="state">Idle Mode</h2>
    `;

    // testing work state (during pomo)
    timer.counter.totalPomos = 0;
    timer.counter.stateCtr = 0;
    checkState();
    let total = document.getElementById("total").innerHTML;
    let state = document.getElementById("state").innerHTML;
    //expect(total).toBe("0"); //we can't test total in this test because checkState() doesn't set the visual counter
    expect(state).toBe("Work");

    // testing short break state
    timer.counter.totalPomos = 1;
    timer.counter.stateCtr = 1;
    checkState();
    state = document.getElementById("state").innerHTML;
    expect(state).toBe("Short");

    // testing short break state
    timer.counter.totalPomos = 4;
    timer.counter.stateCtr = 7;
    checkState();
    state = document.getElementById("state").innerHTML;
    expect(state).toBe("Long"); 
})

/* I kept this here just in case but I don't think we can use any of it
test('Check onStart', () => {
    document.getElementById("state").innerHTML
})

const checkState = require("source/checkState");
test("Check checkState current state and total pomos", () => {
    //require("./timer.js");
    timer.currState = "Work";
    timer.counter.totalPomos = 0;
    timer.counter.stateCtr = 0;
    checkState();
    let total = document.getElementById('total').innerHTML;
    let state = document.getElementById('state').innerHTML;
    expect(total).toBe(0);
    expect(state).toBe("Work");

    timer.currState = "Short";
    timer.counter.totalPomos = 1;
    timer.counter.stateCtr = 1;
    checkState();
    total = document.getElementById('total').innerHTML;
    state = document.getElementById('state').innerHTML;
    expect(total).toBe(1);
    expect(state).toBe("Short");

    timer.currState = "Long";
    timer.counter.totalPomos = 4;
    timer.counter.stateCtr = 6;
    checkState();
    total = document.getElementById('total').innerHTML;
    state = document.getElementById('state').innerHTML;
    expect(total).toBe(4);
    expect(state).toBe("Long");
    
})
*/
