const {showNotif} = require("./notifications");

test("Check notifications is long break", () => {
    let body = showNotif("Long Break State");
    expect(body).toBe("You have completed a pomo! Your long break begins now :)");  
});

test("Check notification is short break", () => {
    let body = showNotif("Short Break State");
    expect(body).toBe("You have completed a pomo! Your short break begins now :)");
});

test("Check notification is pomo", () => {
    let body = showNotif("Work State");
    expect(body).toBe("Your break has ended. A new pomo begins now :)");
});