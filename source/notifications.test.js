const { globalThis } = require("globalthis/implementation");
const {getNotificationStatus, getAlarm} = require("./notifications");

describe("Test that the alarm object", () => {
    test("correctly exists", () => {
        expect(getAlarm()).not.toBeNull();
    }),
    
    test("has a valid url", () => {
        expect(getAlarm().src).not.toBeNull();
    });
})

//Mock the Notification API
globalThis.Notification = ({
    requestPermission: function(){this.permission = "granted"},
    permission: "granted",
});

describe("Test the notification", () => {
    test("permissions are granted", () => {
        let permiss = getNotificationStatus();
        expect(permiss).toBe(true);
    }),
    
    test("permissions are denied", () => {
        Notification.permission = "denied"
        let permiss = getNotificationStatus();
        expect(permiss).toBe(false);
    }),
    
    test("permissions are received", () => {
        Notification.permission = "default"
        let permiss = getNotificationStatus();
        expect(permiss).toBeTruthy();
    });
});