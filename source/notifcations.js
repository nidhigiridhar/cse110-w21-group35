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
 * Function name: showNotif
 * Description: displays banner to notify the user which state has just finished 
 * @param {string} typeOfNotif: describes what notification we should create and display. Depending
 *                              on its typeOfNotif, the notifcation body will have different text 
 *                              correspodning to typeOfNotif
 * @return {string} the message body of the notifcation we just displayed on screen 
 */

function showNotif(typeOfNotif){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';
    //set body to some default vaule to be filled in later
    let body = "";
    //depending on typeOfNotif we will set the body of the notifcation to have different text
    if(typeOfNotif === "longBreak"){
        //when it is a long break then the body says the following
        body = "You have completed a pomo! Your long break begins now :)";
    }
    else if(typeOfNotif === "shortBreak"){
        //when it is a short break then the body says the following
        body = "You have completed a pomo! Your short break begins now :)";
    }
    else if(typeOfNotif === "pomo"){
        //when a new pomo starts then the body says the following
        body = "Your break has ended. A new pomo begins now :)";
    }

    if (typeof Notification !== 'undefined') {
        //Create the notification with the values above and it automatically displays
        let workNotif = new Notification(title,{body, icon});
        //After 5 seconds close the notification
        setTimeout(() => {
            workNotif.close()
            }, 5000);
    }

    return body;
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


//module.exports = notifications;
//module.exports = showNotif;
//module.exports = getNotificationStatus;
//module.exports = playSound;

//export { showNotif, getNotificationStatus }
