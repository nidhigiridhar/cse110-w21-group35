//The alarm we will use for the auditorial notifications of transitions
var alarm = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');

/**
 * @name getAlarm
 * @function
 * @description Plays he alarm audio object for testing purposes
 * @return {Audio} The Audio element named alarm
 */
function getAlarm(){
    return alarm;
 }

/**
 * @name playSound
 * @function
 * @description Plays the alarm to notfiy the user that the break or pomo has ended 
 */
 function playSound(){
    alarm.play();
 }
 
/**
 * @name showNotif
 * @function
 * @description Displays the banner notification to notify the user which state has just finished 
 * @param {string} typeOfNotif Describes which notification and notification text should be displayed
 * @return {string} The message body of the notifcation
 */
function showNotif(typeOfNotif){
    //Set the title, icon, and body for the creation of the notification
    let title = "Productoro";
    let icon = 'https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=';
    //set body to some default vaule to be filled in later
    let body = "";
    //depending on typeOfNotif we will set the body of the notifcation to have different text
    if(typeOfNotif === "Long Break State"){
        //when it is a long break then the body says the following
        body = "You have completed a pomo! Your long break begins now :)";
    }
    else if(typeOfNotif === "Short Break State"){
        //when it is a short break then the body says the following
        body = "You have completed a pomo! Your short break begins now :)";
    }
    else if(typeOfNotif === "Work State"){
        //when a new pomo starts then the body says the following
        body = "Your break has ended. A new pomo begins now :)";
    }

    if (typeof Notification !== 'undefined') {
        //Create the notification with the values above and it automatically displays
        let workNotif = new Notification(title,{body, icon});
        //After 5 seconds close the notification
        setTimeout(() => {
            workNotif.close();
        }, 5000);
    }

    return body;
}

/**
 * @name getNotificationStatus
 * @function
 * @description Collects the notification preferences of the user
 * @return {boolean} True if user prefers notifications; otherwise, false
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
        
        //Ask the user if they would like to be sent notifcations
        Notification.requestPermission();
        //once the user has picked a preference then run the method agian and we are ensured
        //the second call will enter either the denied or granted block
        return getNotificationStatus();

    }
    //If the user has their notifcations disabled, return false
    else{
        return false;
    }
}

export {showNotif, getNotificationStatus, playSound, getAlarm};
