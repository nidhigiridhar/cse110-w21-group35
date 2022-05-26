//import { updateTimer } from './modules/timer.js';

const 
    /** @constant @type {number} */
    MS = 1000,
    /** @constant @type {number} **/ 
    NUM_SEC = 60;

/** 
 * Stores the set interval
 * @type {number} 
 */
 let timerId;

//self.addEventListener('message', function(e) {
    onmessage= function(e) {

    if(e.data.msg === 'counts down timer') {

        let duration = Number(e.data.payload);
        let start = Date.now(),
        diff,
        minutes,
        seconds;

        function calcTimer() {
            // get the number of seconds that have elapsed since updateTimer() was called
            diff = duration - (((Date.now() - start) / MS) | 0);
            console.log(diff);///////////////////
            // truncates the float
            minutes = (diff / NUM_SEC) | 0;
            seconds = (diff % NUM_SEC) | 0;
    
            // add extra 0 to minutes/seconds if they are less than 10
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            if(minutes == 0 && seconds == 0) {
                clearInterval(timerId);
            }
            self.postMessage({
                minutes: minutes,
                seconds: seconds
            });
            if (diff <= 0) {
                // add one second so that the countdown starts at the full duration
                // example 05:00 not 04:59
                start = Date.now() + 1000;
            }
        }

        calcTimer(); // don't wait a full second before the timer starts
        timerId = setInterval(calcTimer, 10); // fires set interval often to give time to update
        //updateTimer(Number(e.data.payload));
        
    } else if(e.data.msg === 'resets timer' ) {
        clearInterval(timerId);
    }
}
//});