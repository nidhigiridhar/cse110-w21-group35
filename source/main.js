// Import modules

import { onStart, onReset, checkState, updateState, timer, setCustomTime, keyboardShortcut, revealSettings, hideSettings} from './modules/timer.js';
import { revealHelp, hideHelp } from './modules/help.js';
import { showNotif, getNotificationStatus, playSound, getAlarm } from './modules/notifications.js';
import { colorChange } from './modules/color-change.js';
<<<<<<< HEAD
import { breakReminders } from './modules/breakReminder.js'
import { addTaskButton, cancelTask, saveTask, createCustomTaskTag, finishTask } from './modules/task-list.js'
=======
import { breakReminders } from './modules/break-reminder.js'

>>>>>>> develop

// Timer
document.getElementById('formEnabler').addEventListener('change', setCustomTime);
document.getElementById('startButton').addEventListener('click', onStart);
document.getElementById('resetButton').addEventListener('click', onReset);

// Keyboard shortcuts
document.addEventListener('keydown', keyboardShortcut);

// Modals
document.getElementById('helpButton').addEventListener('click', revealHelp);
document.getElementById('closeModal').addEventListener('click', hideHelp);
document.getElementById('settingsButton').addEventListener('click', revealSettings);
document.getElementById('closeSettings').addEventListener('click', hideSettings);

<<<<<<< HEAD
// Task list
document.getElementById('addTasksButton').addEventListener('click',addTaskButton);
document.getElementById('saveButton').addEventListener('click',saveTask);
document.getElementById('cancelButton').addEventListener('click',cancelTask);

=======
>>>>>>> develop
  