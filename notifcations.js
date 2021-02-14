//The alarm we will use for the auditorial notifications of transitions
var alarm = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');

/**
 * Function name: showPomoNotif
 * Description: notifies user that their break is over and a new pomo begins 
 * @param none
 * @return none
 */

function showPomoNotif(){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let body = "Your break has ended. A new pomo begins now :)";
    let icon = 'https://bit.ly/2DYqRrh';

    //Create the notification and it automatically displays
    let workNotif = new Notification(title,{body, icon});   
    //Play the alarm
    alarm.play();
}

/**
 * Function name: showLongBreakNotif
 * Description: notifies user that the pomo is over and their long break begins 
 * @param none
 * @return none
 */

function showLongBreakNotif(){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let body = "You have completed a pomo! Your long break begins now :)";
    let icon = 'https://bit.ly/2DYqRrh';

    //Create the notification and it automatically displays
    let workNotif = new Notification(title,{body, icon});    
    //Play the alarm
    alarm.play();
}

/**
 * Function name: showShortBreakNotif
 * Description: notifies user that the pomo is over and their short break begins 
 * @param none
 * @return none 
 */

function showShortBreakNotif(){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let body = "You have completed a pomo! Your short break begins now :)";
    let icon = 'https://bit.ly/2DYqRrh';

    //Create the notification and it automatically displays
    let workNotif = new Notification(title,{body, icon});
    //Play the alarm
    alarm.play();
}

/**
 * Function name: getNotificationStatus
 * Description: returns a boolean representing the notifaction setttings of user
 *              false -> don't send notifcations, true -> send notifcations
 * @param none
 * @return {boolean} permissionStatus: Value of the two numbers added together
 */

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
