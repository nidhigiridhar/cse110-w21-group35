/**
 * @name: breakReminders
 * @description: display ideas on how to spend breaks
 */
 
function breakReminders(){
    
    let stuffToDoWithBreak = ['Create a 5-minute stretch routine', 'Take a short walk', 'Do breathing exercises', 'Do a quick 5-minute clean-up', 
    'Make yourself a snack', 'Go outside and soak in the sun', 'Create a quick yoga routine', 'Do some calisthenics', 'Listen to a motivational song', 'juggle',
     'Work on a fun hobby', 'Do a quick sprint', 'Do some food preparation for dinner', 'Declutter your space', 'Organize', 'Take out the trash'
      ,"Change that lightbulb that's needed changing (or any other small task that needs doing)" ,'Meditate', 'Clean your junk drawer'
      ,'Fold laundry or throw a load of laundry into the washer', 'Empty or fill the dishwasher' ,'Put food out for birds' ,'Water plants'
      , 'Clean your phone and glasses' ,'Go to the bathroom','Jumping jax', 'Stretch your back', 'Stretch your arms', 'Do push-ups', 'Find a new pod-cast'];
    
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
    module.exports = { breakReminders };