test("Check notifications of timer", () => {
    require("./notification.js");

    let body = showNotif("longBreak");

    expect(body).toBe("You have completed a pomo! Your long break begins now :)");

    /*timer.currState = "Work";
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
    expect(state).toBe("Long");*/
    
})