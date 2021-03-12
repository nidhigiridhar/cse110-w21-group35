import { circles, reset } from '../progress-bar.js';
import { timer, WORK_STATE, updateState } from '../timer.js';

describe('Test progress bar', () => {
    test('all dots are active at beginning of four pomo cycle', () => {
        document.body.innerText = `
            <div class='container'>
            <div class='progress-container'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='timerDisplay' state='pomo'>25:00</div> <!-- displays the timer countdown -->
            </div>        
        `;
        reset();
        circles.forEach(circle => {
            expect(circle.classList.contains('deactive')).toBeFalsy();
        });
    }),

    test('first dot is deactivated after one work session is completed', () => {
        document.body.innerHTML = `
            <div id='breakReminder' style='color:#464646;' style='visibility: hidden;'></div>
            <div id='reminder' onload='breakReminders()' style='color:#464646;' style='visibility: hidden;'></div>   <!-- ensures divs are hidden on init load-->
            <h2 id='state'>Work State</h2>
            <div class='container'>
            <div class='progress-container'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='timerDisplay' state='pomo'>25:00</div> <!-- displays the timer countdown -->
            </div>  
            <div id='buttonContainer'> <!-- container for start and reset buttons-->
                <button type=button class='timer-button' id='startButton'>Start</button>
                <button type=button class='timer-button' id='resetButton' disabled>Reset</button>
            </div>      
        `;
        timer.currState = WORK_STATE;
        updateState();
        circles.forEach((circle,idx) => {
            if(idx == 0) {
                expect(circle.classList.contains('deactive')).toBeTruthy();
            }
            else {
                expect(circle.classList.contains('deactive')).toBeFalsy();
            }
        });
    }),

    test('second dot is deactivated after one short break session is completed', () => {
        document.body.innerHTML = `
            <div id='breakReminder' style='color:#464646;' style='visibility: hidden;'></div>
            <div id='reminder' onload='breakReminders()' style='color:#464646;' style='visibility: hidden;'></div>   <!-- ensures divs are hidden on init load-->
            <h2 id='state'>Work State</h2>
            <div class='container'>
            <div class='progress-container'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='timerDisplay' state='pomo'>25:00</div> <!-- displays the timer countdown -->
            </div>  
            <div id='buttonContainer'> <!-- container for start and reset buttons-->
                <button type=button class='timer-button' id='startButton'>Start</button>
                <button type=button class='timer-button' id='resetButton' disabled>Reset</button>
            </div>      
        `;
        timer.currState = WORK_STATE;
        updateState();
        updateState();
        circles.forEach((circle,idx) => {
            if((idx == 0) || (idx == 1)) {
                expect(circle.classList.contains('deactive')).toBeTruthy();
            }
            else {
                expect(circle.classList.contains('deactive')).toBeFalsy();
            }
        });
    });

    test('all dots are deactivated after long break is completed', () => {
        document.body.innerHTML = `
            <div id='breakReminder' style='color:#464646;' style='visibility: hidden;'></div>
            <div id='reminder' onload='breakReminders()' style='color:#464646;' style='visibility: hidden;'></div>   <!-- ensures divs are hidden on init load-->
            <h2 id='state'>Work State</h2>
            <div class='container'>
            <div class='progress-container'>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle short'></div>
                <div class='circle pomo'></div>
                <div class='circle long'></div>
            </div>
            <div id='timerDisplay' state='pomo'>25:00</div> <!-- displays the timer countdown -->
            </div>  
            <div id='buttonContainer'> <!-- container for start and reset buttons-->
                <button type=button class='timer-button' id='startButton'>Start</button>
                <button type=button class='timer-button' id='resetButton' disabled>Reset</button>
            </div>      
        `;
        timer.currState = WORK_STATE;
        updateState();
        updateState();
        updateState();
        updateState();
        updateState();
        updateState();
        updateState();
        updateState(); // long break is completed
        circles.forEach((circle,idx) => {
            expect(circle.classList.contains('deactive')).toBeTruthy();
        });
    });
});
