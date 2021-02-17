//The alarm we will use for the auditorial notifications of transitions
var alarm = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');


/**
 * Function name: playSound
 * Description: plays tone to notfiy the user that the break or pomo has ended 
 * @param none
 * @return none
 */

 function playSound(){
    //Play the alarm
    alarm.play();
 }

/**
 * Function name: showPomoNotif
 * Description: displays banner to notify user that their break is over and a new pomo begins 
 * @param none
 * @return none
 */

function showPomoNotif(){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let body = "Your break has ended. A new pomo begins now :)";
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';

    //Create the notification and it automatically displays
    let workNotif = new Notification(title,{body, icon});
    //After 5 seconds close the notification
    setTimeout(() => {
        workNotif.close()
        }, 5000);    
}

/**
 * Function name: showLongBreakNotif
 * Description: displays banner to notify user that the pomo is over and their long break begins 
 * @param none
 * @return none
 */

function showLongBreakNotif(){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let body = "You have completed a pomo! Your long break begins now :)";
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';

    //Create the notification and it automatically displays
    let workNotif = new Notification(title,{body, icon});
    //After 5 seconds close the notification
    setTimeout(() => {
        workNotif.close()
        }, 5000);    
}

/**
 * Function name: showShortBreakNotif
 * Description: displays banner to notify user that the pomo is over and their short break begins 
 * @param none
 * @return none 
 */

function showShortBreakNotif(){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let body = "You have completed a pomo! Your short break begins now :)";
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';

    //Create the notification and it automatically displays
    let workNotif = new Notification(title,{body, icon});
    //After 5 seconds close the notification
    setTimeout(() => {
        workNotif.close()
        }, 5000);
}

/**
 * Function name: getNotificationStatus
 * Description: gets the notifaction preferences of user or asks for preferences if not yet set
 * @param none
 * @return {boolean} permissionStatus: boolean representing notifcation preference: 
 *                                     false -> don't send notifcations, true -> send notifcations
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
