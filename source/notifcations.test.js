const {getNotificationStatus, playSound, getAlarm} = require("./notifcations");

test("Check alarm exists", () => {
    expect(getAlarm()).not.toBeNull();
});

test("Check alarm has valid url", () => {
    expect(getAlarm().src).not.toBeNull();
});

//Mock the Notification API
globalThis.Notification = ({
    requestPermission: function(){this.permission = "granted"},
    permission: "granted",
  });

test("Check premission granted", () => {
    let permiss = getNotificationStatus();
    expect(permiss).toBe(true);
});

test("Check premission denied", () => {
    Notification.permission = "denied"
    let permiss = getNotificationStatus();
    expect(permiss).toBe(false);
});


test("Check premission received", () => {
    Notification.permission = "default"
    let permiss = getNotificationStatus();
    expect(permiss).toBeTruthy();
});