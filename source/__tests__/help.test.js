import { revealHelp, hideHelp } from '../help.js';

describe('Test when nothing is clicked', () => {
    test('help button is enabled', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span>
                </div>
            </div>
        `;
        // help button should be enabled
        const helpBtn = document.getElementById('helpButton');
        let helpBtnDisabled = helpBtn.disabled;
        expect(helpBtnDisabled).toBeFalsy;
    }),

    test('help modal is hidden', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span>
                </div>
            </div>
        `;
        let helpModal = document.getElementById('helpModal');
        let display = helpModal.style.display;
        expect(display).toBe('');
    });
});

 describe('Test revealHelp function', () => {
    test('disables help button', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span disabled>
                </div>
            </div>
        `;
        revealHelp();
        const helpBtn = document.getElementById('helpButton');
        let helpBtnDisabled = helpBtn.disabled;
        expect(helpBtnDisabled).toBeTruthy;
    }),

    test('help modal is visible', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span>
                </div>
            </div>
        `;
        revealHelp();
        let helpModal = document.getElementById('helpModal');
        let display = helpModal.style.display;
        expect(display).toBe('block');
    });
});

describe('Test hideHelp function', () => {
    test('enables help button', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span disabled>
                </div>
            </div>
        `;
        hideHelp();
        const helpBtn = document.getElementById('helpButton');
        let helpBtnDisabled = helpBtn.disabled;
        expect(helpBtnDisabled).toBeFalsy;
    }),

    test('help modal is hidden', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span>
                </div>
            </div>
        `;
        revealHelp();
        let helpModal = document.getElementById('helpModal');
        let display = helpModal.style.display;
        expect(display).toBe('block');

        hideHelp();
        helpModal = document.getElementById('helpModal');
        display = helpModal.style.display;
        expect(display).toBe('none');
    });
});

describe('Test help button', () => {
    test('calls revealHelp functions', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span disabled>
                </div>
            </div>
        `;
        const helpBtn = document.getElementById('helpButton');
        helpBtn.click();
        expect(revealHelp).toBeCalled;
    });
});

describe('Test closing the help modal', () => {
    test('is triggered by clicking the close button', () => {
        document.body.innerHTML = `
            <button type=button class='help-button' id=helpButton>?</button disabled>
            <div id='helpModal' class='modal'>
                <div class='help-content'>
                <span id='closeModal'>&times;</span>
                </div>
            </div>
        `;
        const closeBtn = document.getElementById('helpButton');
        closeBtn.click();
        expect(hideHelp).toBeCalled;
    });
});