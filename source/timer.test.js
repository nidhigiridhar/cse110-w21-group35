/*
test('Check onStart', () => {
    document.getElementById("state").innerHTML
})
*/
//const checkState = require("source/checkState");
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
