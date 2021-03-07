import {timer, WORK_STATE, SHORT_STATE, LONG_STATE} from "./timer.js";
/**
 * @name breakReminders
 * @function
 * @description Displays ideas for breaks during short and long break states
 */
function breakReminders(){
    
    let stuffToDoWithBreak = ["Create a 5-minute stretch routine", "Take a short walk", "Do breathing exercises", "Do a quick 5-minute clean-up", 
    "Make yourself a snack", "Go outside and soak in the sun", "Create a quick yoga routine", "Do some calisthenics", "Listen to a motivational song", "Juggle",
    "Work on a fun hobby", "Do a quick sprint", "Do some meal preparation", "Declutter your space", "Organize", "Take out the trash", 
    "Change that lightbulb that's needed changing (or any other small task that needs doing)", "Meditate", "Clean your junk drawer", 
    "Do your laundry", "Empty or fill the dishwasher", "Put food bird food", "Water plants", "Clean your phone and glasses", 
    "Go to the bathroom", "Do some jumping jacks", "Stretch your back", "Stretch your arms", "Do some push-ups", "Find a new podcast"];
    
    let random_idea = stuffToDoWithBreak[Math.floor(Math.random() * stuffToDoWithBreak.length)];
 
    document.getElementById("reminder").style.visibility = "hidden";
    document.getElementById("break-reminder").innerHTML = random_idea;
    document.getElementById("reminder").innerHTML = "";
      
   
    switch(timer.currState) {
 
        case WORK_STATE:
            document.getElementById("break-reminder").style.visibility = "hidden";
            document.getElementById("reminder").style.visibility = "hidden";
            break;
 
        case SHORT_STATE:
            document.getElementById("break-reminder").innerHTML = "An idea for how to spend your break:";
            document.getElementById("break-reminder").style.visibility = "visible";
            document.getElementById("reminder").style.visibility = "visible"; 
           document.getElementById("reminder").innerHTML = random_idea;
            break;
        
        case LONG_STATE:
            document.getElementById("break-reminder").innerHTML = "An idea for how to spend your break:";
            document.getElementById("break-reminder").style.visibility = "visible";
            document.getElementById("reminder").style.visibility = "visible";
            document.getElementById("reminder").innerHTML = random_idea;
            break;
        
        default:
            document.getElementById("break-reminder").style.visibility = "hidden";
            document.getElementById("reminder").style.visibility = "hidden";
            break;    
    
    }
  
}
    var module = module || {};
export { breakReminders };