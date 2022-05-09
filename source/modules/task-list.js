/**
 * @name addTaskButton
 * @function
 * @description Opens or closes add-task form
 */
function addTaskButton() {
    let button = document.getElementById("add-task-form");
    if (button.classList.contains("hidden") === true) {
        button.classList.remove("hidden");
    }
    else {
        button.classList.add("hidden");
    }
}

/**
 * @name cancelTask
 * @function
 * @description Closes add-task form
 */
function cancelTask() {
    document.getElementById("task-name").value = "";
    document.getElementById("add-task-form").classList.add("hidden");
}

/**
 * @name saveTask
 * @function
 * @description Adds new task to task list
 */
function saveTask() {
    let taskNameInput = document.getElementById("task-name");
    let taskList = document.getElementById("task-list");
    let newTask = createCustomTaskTag(taskNameInput.value);
    taskList.appendChild(newTask);
    cancelTask();
}

/**
 * @name selectTask
 * @function 
 * @description Display selected task at top of task list
 */
function selectTask(taskName) {
    let currentTask = document.getElementById('current-task');
    const tasks = document.querySelectorAll('input[name="task-option"]');
    for (let task of tasks) {
        if (task.checked) {
            currentTask.innerText = task.value;
            break;
        }
    }
}

/**
 * @name createCustomTaskTag
 * @function
 * @description Creates a custom tag for a task
 * @param {string} taskName task name
 * @returns {HTMLLIElement} returns a HTML li tag
 */
function createCustomTaskTag(taskName) {
    let taskContainer = document.createElement('li');
    let taskLabel = document.createElement('label');
    let taskButton = document.createElement('input');
    let editButton = document.createElement('button');
    let completeButton = document.createElement('button');

    taskContainer.setAttribute('class', 'task');
    taskContainer.style.border = '3px solid black';
    
    // When user clicks on the task, it gets crossed off
    taskButton.setAttribute('type', 'radio');
    taskButton.setAttribute('id', 'task-btn');
    taskButton.setAttribute('class', 'task-button');
    taskButton.setAttribute('name', 'task-option');
    taskButton.addEventListener('change', function(e) {
        let currentTask = document.getElementById('current-task');
            if (this.checked) {
                currentTask.innerText = taskName;
            }
    });

    taskLabel.contentEditable = false;
    taskLabel.setAttribute('class', 'task-label');
    taskLabel.setAttribute('for', 'task-btn');
    taskLabel.innerText = taskName;

    editButton.innerText = 'Edit';

    // Let user edit the task's name when edit button is clicked
    editButton.addEventListener('click', () => {
        taskLabel.contentEditable = true;
        taskLabel.focus();
        taskLabel.addEventListener('keypress', (even) => { // turns off editability when hit enter key
            if (even.key === 'Enter')
                taskLabel.contentEditable = false;
        });
    });

    // taskContainer.appendChild(taskLabel);
    taskContainer.appendChild(taskButton);
    taskContainer.appendChild(taskLabel);
    taskContainer.appendChild(editButton);
    return taskContainer;
}

/**
 * @name clearTasksButton
 * @function
 * @description Clears Task List
 */
function clearTasksButton() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
}

/**
 * @name 
 * @function
 * @description 
 */

 // Export all functions
 export { addTaskButton, cancelTask, saveTask, createCustomTaskTag, clearTasksButton }
