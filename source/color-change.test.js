import { colorChange } from "./color-change.js";
import {timer, WORK_STATE, SHORT_STATE, LONG_STATE} from "./timer.js";

describe("Test colorChange function", () =>{
    test("Color changes at short break state", () => {
        document.body.innerHTML = `
            <div id="timer-display" state="pomo">25:00</div>
        `;
        timer.currState = SHORT_STATE;
        colorChange();
        expect(document.body.getAttribute('state')).toBe("short");
        expect(document.getElementById("timer-display").getAttribute('state')).toBe("short");    
    }),

    test("Color changes at long break state", () => {
        document.body.innerHTML = `
            <div id="timer-display" state="pomo">25:00</div>
        `;
        timer.currState = LONG_STATE;
        colorChange();
        expect(document.body.getAttribute('state')).toBe("long");
        expect(document.getElementById("timer-display").getAttribute('state')).toBe("long");
    }),

    test("Color changes at work state", () => {
        document.body.innerHTML = `
            <div id="timer-display" state="pomo">25:00</div>
            <div class="progress-container">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
        `;
        timer.currState = WORK_STATE;
        colorChange();
        expect(document.body.getAttribute('state')).toBe("pomo");
        expect(document.getElementById("timer-display").getAttribute('state')).toBe("pomo");
    })

})