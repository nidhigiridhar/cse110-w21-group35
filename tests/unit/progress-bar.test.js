let html = `<main>

<!-- Break Reminder -->
<p id='break-reminder' style='color:#464646; visibility: hidden'></p>
<p id='reminder' onload='breakReminders()' style='color:#464646; visibility: hidden'></p>  

<!-- Current State  -->
<h2 class='text-center' id='state' hidden>Work State</h2> 

<!-- Progress Bar -->
<section class="progress-bar">
    <div id="progress-pomo">
        <img src="./img/icons/progress-tomato.png" alt="pomodoro time">
    </div>
    <div id="progress-break">
        <img src="./img/icons/progress-leaf.png" alt="short break time">
    </div>
    <div id="progress-long-break">
        <img src="./img/icons/progress-coffee.png" alt="long break time">
    </div>
</section>

<!-- Timer -->
<div class='timer'>
    <p id="timer-display" data-state='pomo'>25:00</p>
    <p>Streak: <span id="streak">0</span></p>
    <p>Completed: <span id="total">0</span></p>
</div>

<!-- Start Reset Button -->
<div id='start-reset'>
    <button type=button class='timer-button' id='start-button'>Start</button>
    <button type=button class='timer-button' id='reset-button' disabled>Reset</button>
</div>

<!-- Current Task -->
<section class="current-task">
    <h2>Current Task</h2>
    <p id="current-task"></p>
</section>

<!-- Task List -->
<section class="tasks" id="tasks">
    <h2>Tasks</h2>

    <!-- List Options -->
    <div id="task-options">
        <button type="button" id="add-tasks-button">Add</button>
        <button type="button" id="clear-tasks-button">Clear</button>
        <button type="button" id="clear-completed-tasks-button">Completed</button>
    </div>

    <hr />

    <ul id="task-list"></ul>
</section>

</main>`;

describe("Test Progress bar", () => {
  test("all dots are active at beginning of four pomo cycle", () => {
    document.body.innerHTML = html;
    let pomo = document.getElementById("progress-pomo");
    // let short = document.getElementById("progress-short");
    // let long = document.getElementById("progress-long-break");
    expect(pomo.style.background).toBe("#ed6663");
  });
});
