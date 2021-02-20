const showNotif = require("./notifcations");

test("Check notifications of timer", () => {
    let body = showNotif("longBreak");
    expect(body).toBe("You have completed a pomo! Your long break begins now :)");    
})

test("Check notification is short break", () => {
    let body = showNotif("shortBreak");
    expect(body).toBe("You have completed a pomo! Your short break begins now :)");
})

test("Check notification is pomo", () => {
    let body = showNotif("pomo");
    expect(body).toBe("Your break has ended. A new pomo begins now :)");
})

function getNotificationStatus(){
    //If the browser does not support Notifications then return false
    if(!window.Notification){
        return false;
    }

    //If the user allows notifications then return true
    if(Notification.permission === "granted"){
        return true;
    }
    //If the user has not set notifications preferences then ask user
    else if(Notification.permission === "default"){
        //boolean to detect user input of notification preference within inner function below
        var status = false;
        //Ask the user if they would like to be sent notifcations
        Notification.requestPermission().then(function(permission) {
            //If they do set status to true
            if(permission === "granted"){
                status = true;
            }
            //Otherwise set status to false
            else{
                status = false;
            }
        });

        //return status once we received the user's preference 
        return status;
    }
    //If the user has their notifcations disabled, return false
    else{
        return false;
    }
}

test("Check notifications", () => {
    Notification.permision = "granted";
    let bool = getNotificationStatus();
    expect(bool).toBe(true);
})