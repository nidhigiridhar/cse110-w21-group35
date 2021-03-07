document.body.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css"></link>
    <title>Productoro</title>
</head>
<header>  
    <div id="counter-container">
        <div id="streak-counter"><b>Streak:</b> <span id="streak">0</span></div>
        <div id="total-counter"><b>Total Pomos Completed:</b> <span id="total">0</span></div>
        <h1 style="color:#464646;">Productoro</h1>
        <div id="break-reminder" style="color:#464646;"></div>
        <div id="reminder" onload="breakReminders()" style="color:#464646;"></div>   <!-- ensures divs are hidden on init load-->
    </div>
    

</header>
<body state="pomo">
    <!-- <div class="container">
        <div class="progress-container">
            <div class="circle active pomo"></div>
            <div class="circle active short"></div>
            <div class="circle active pomo"></div>

            <div class="circle active short"></div>
            <div class="circle active pomo"></div>
            <div class="circle active short"></div>
            <div class="circle active pomo"></div>
            <div class="circle active long"></div>
        </div>
    </div>         -->

    <div id="timer-container">
        <h2 id="state">Work State</h2> <!-- mode name changes based on state of timer -->
        <div class="container">
            <div class="progress-container" state="pomo">
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle short"></div>
                <div class="circle pomo"></div>
                <div class="circle long"></div>
            </div>
        </div>        
        <div id="timer-display" state="pomo">25:00</div> <!-- displays the timer countdown -->
    </div>
    <div id="button-container"> <!-- container for start and reset buttons-->
        <button type=button class="timer-button" id="startButton">Start</button>
        <button type=button class="timer-button" id="resetButton" disabled>Reset</button>
    </div>
    <div id="help-container"> <!-- container for non-static instructions-->
        <button type=button class="help-button" id=helpButton>?</button>
        <div id="helpModal" class="modal">
            <div class="modal-content">
                <!-- Modal content -->
                <span id="closeModal">&times;</span disabled>
                <h3>What is a Pomodoro Timer?</h3>
                <p>A Pomodoro Timer is a time management tool that breaks down work into intervals (pomos).  
                    Work intervals are typically 25 minutes long with five minute breaks between each interval. 
                    A longer 15 minute break occurs between every fourth and fifth interval.</p>
                <p>The Pomodoro technique increases productivity, enhances focus while working, and can be used by anyone!</p>
                <h3>How to use Productoro:</h3>
                <ol>
                    <li>Press <b>Start</b> to begin your pomodoro timer. Your first pomo will begin and the timer will begin counting down from 25 minutes.</li>
                    <li>After 25 minutes, the timer will automatically begin your five minute break and, afterwards, automatically begin your second pomo.</li>
                    <li>The pomos and breaks will continue to automatically begin until you press <b>Reset</b>. <b>Reset</b> restarts the current pomo or break. <b>Start</b> must be pressed again to begin the countdown on the timer.</li>
                </ol>
            </div>
            
        </div>
    </div>
    

    <div id="settingContainer">
        <button type=button class="settings" id="settingsButton"><img id="cog" src="img/Settings_icon.png"/></button>
        <div id="settingsModal" class="modal">
            <div class="settings-content">
            <span id="closeSettings">&times;</span disabled>
            <form id='time-limits'>
                <div id="warning" style="display:none">Wait until the end of your next break to change the times!</div>
                <fieldset id="formEnabler">
                    <label id="workLabel">Select length for Work Session</label> 
                    <select name="workTime" id="workTime">
                        <option value="25" selected>25</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <br>
            
                    <label id="shortBreakLabel">Select length for Short Break</label>
                    <select name="shortBreakTime" id="shortBreakTime">
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <br>
            
                    <label id="longBreakLabel">Select length for Long Break</label>
                    <select name="longBreakTime" id="longBreakTime">
                        <option value="15" selected>15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <br>
                </fieldset>  
                <div id="notifReminder"> Remember to have system notifications enabled!</div>

                <ul class="switches">
                    <li>
                      <input type="checkbox" id="notifToggle">
                      <label for="notifToggle">
                        <span>Audio Alarm</span>
                        <span></span>
                      </label>
                    </li>
                    <br>
                    <li>
                        <input type="checkbox" id="keyboardToggle">
                        <label for="keyboardToggle">
                          <span>Keyboard Shortcuts</span>
                          <span></span>
                        </label>
                      </li>
                </ul>
            </form>    
            </div>
            
        </div>
    </div>
        
    </div>
    <footer>
        <img src="img/DT2 (Final).png" alt="Dream Team logo">
        <p>Made by the Dream Team</p>
    </footer>

    <!-- JS files -->
    <script type="module" src="./timer.js"></script>
    <script type="module" src="./notifications.js"></script>
    <script type="module" src="./color-change.js"></script>
    <script type="module" src="./help.js"></script>
    <script type="module" src="./breakReminder.js"></script>
    <script type="module" src="./progress-bar.js"></script>
    <script type="module">
        import { onStart, onReset, checkState, updateState, timer, setCustomTime, keyboardShortcut, revealSettings, hideSettings} from "./timer.js";
        import {revealHelp, hideHelp} from "./help.js";
        import {showNotif, getNotificationStatus, playSound, getAlarm} from "./notifications.js"
        document.getElementById("formEnabler").addEventListener("change", setCustomTime);
        document.getElementById("startButton").addEventListener("click", onStart);
        document.getElementById("resetButton").addEventListener("click", onReset);
        document.addEventListener("keydown", keyboardShortcut);
        document.getElementById("helpButton").addEventListener("click", revealHelp);
        document.getElementById("closeModal").addEventListener("click", hideHelp);
        document.getElementById("settingsButton").addEventListener("click", revealSettings);
        document.getElementById("closeSettings").addEventListener("click", hideSettings);
    </script>
</body>
</html>`;