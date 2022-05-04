// import modules

import { onStart, onReset, checkState, updateState, timer, setCustomTime, keyboardShortcut, revealSettings, hideSettings} from './modules/timer.js';
import { revealHelp, hideHelp } from './modules/help.js';
import { showNotif, getNotificationStatus, playSound, getAlarm } from './modules/notifications.js'
import { colorChange } from './modules/color-change.js';
import { breakReminders } from './modules/breakReminder.js'

  document.getElementById('formEnabler').addEventListener('change', setCustomTime);
    document.getElementById('startButton').addEventListener('click', onStart);
    document.getElementById('resetButton').addEventListener('click', onReset);
    document.addEventListener('keydown', keyboardShortcut);
    document.getElementById('helpButton').addEventListener('click', revealHelp);
    document.getElementById('closeModal').addEventListener('click', hideHelp);
    document.getElementById('settingsButton').addEventListener('click', revealSettings);
    document.getElementById('closeSettings').addEventListener('click', hideSettings);



  