const {showNotif} = require("./notifcations");

test("Check notifications is long break", () => {
    let body = showNotif("longBreak");
    expect(body).toBe("You have completed a pomo! Your long break begins now :)");  
});

test("Check notification is short break", () => {
    let body = showNotif("shortBreak");
    expect(body).toBe("You have completed a pomo! Your short break begins now :)");
});

test("Check notification is pomo", () => {
    let body = showNotif("pomo");
    expect(body).toBe("Your break has ended. A new pomo begins now :)");
});
