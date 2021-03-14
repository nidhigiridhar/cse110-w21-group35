import { colorChange } from '../color-change.js';
import { timer, WORK_STATE, SHORT_STATE, LONG_STATE } from '../timer.js';

describe('Test colorChange function', () =>{
    test('changes the background color at short break state', () => {
        document.body.innerHTML = `
            <div id='timerDisplay' state='pomo'>25:00</div>
        `;
        timer.currState = SHORT_STATE;
        colorChange();
        expect(document.body.getAttribute('state')).toBe('short');
        expect(document.getElementById('timerDisplay').getAttribute('state')).toBe('short');    
    }),

    test('changes the background color at long break state', () => {
        document.body.innerHTML = `
            <div id='timerDisplay' state='pomo'>25:00</div>
        `;
        timer.currState = LONG_STATE;
        colorChange();
        expect(document.body.getAttribute('state')).toBe('long');
        expect(document.getElementById('timerDisplay').getAttribute('state')).toBe('long');
    }),

    test('changes the background color at work state', () => {
        document.body.innerHTML = `
            <div id='timerDisplay' state='pomo'>25:00</div>
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
        `;
        timer.currState = WORK_STATE;
        colorChange();
        expect(document.body.getAttribute('state')).toBe('pomo');
        expect(document.getElementById('timerDisplay').getAttribute('state')).toBe('pomo');
    });
});