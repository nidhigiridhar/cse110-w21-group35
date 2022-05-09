/** These variables are for the save task and edit task.
 * Using the same form for save task and edit task
 * SAVE_ON: adding new task
 * EDIT_ON: eddting task
 * TASK_CONTENT: the content of the current edited task
 * if a task has more content, adjust this variable
*/
const SAVE_ON = true;
const EDIT_ON = false;
let SAVE_FLAG = SAVE_ON;
let TASK_CONTENT = null;


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
    setSaveFlag(SAVE_ON);
    setTaskContent(null);
}

/**
 * @name saveTask
 * @function
 * @description Adds new task to task list
 */
function saveTask() {
    let taskNameInput = document.getElementById("task-name");
    let taskList = document.getElementById("task-list");

    if (SAVE_FLAG === SAVE_ON) { // Save new task
        if (inputSanitizer(taskNameInput.value)){ // check for input
            alert("Please enter something!!");
            taskNameInput.focus();
            return;
        }
        
        let newTask = createCustomTaskTag(taskNameInput.value);
        taskList.appendChild(newTask);
    }
    else { // edit old task
        TASK_CONTENT.value = taskNameInput.value;
    }
    cancelTask();
}



/**
 * @name setFinished
 * @function
 * @description Sets task attribute "finished" to true or false based on current state
 * @param {string} taskContainer container element of task
 * @returns 
 */
function setFinished(taskContainer) {
    if (taskContainer.getAttribute("finished") == false) {
        taskContainer.setAttribute('finished', 'true');
    } else {
        taskContainer.setAttribute('finished', 'false');
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
    let taskButton = document.createElement('input');
    let editButton = document.createElement('button');

    // When user clicks on the task, it gets crossed off
    taskButton.addEventListener('click', setFinished(taskContainer));
    
    taskContainer.setAttribute('class', 'task');
    taskContainer.style.border = '3px solid black';
    taskContainer.setAttribute('finished', 'false');
    
    taskButton.setAttribute('type', 'button');

    taskButton.setAttribute('class', 'task-label');
    taskButton.value = taskName;

    editButton.innerText = 'Edit';
    
    taskContainer.appendChild(taskButton);
    taskContainer.appendChild(editButton);
    setEditTask(taskContainer);
    return taskContainer;
}

/**
 * @name setEditTask
 * @function
 * @description Set up edit task
 * @param taskContainer a task container
 */
function setEditTask(taskContainer) {
    // children[1] - the edit button is the 1th child of taskContainer
    taskContainer.children[1].addEventListener('click', () => {
        loadForm(taskContainer.children[0]);
    });
}

/**
 * @name loadForm
 * @function
 * @description Load content form a task to task form
 * @param content the content of the task
 */
function loadForm(content){
    let taskName = document.getElementById("task-name");
    document.getElementById("add-task-form").classList.remove("hidden");
    taskName.value = content.value;
    taskName.focus();
    setTaskContent(content);
    setSaveFlag(EDIT_ON);
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

/**
 * @name 
 * @function
 * @description 
 */

/**
 * @name setSaveFlag
 * @function
 * @description helper function - set SAVE_FLAG for saving new task or editing task
 * @param value SAVE_ON or EDIT_ON
 */
function setSaveFlag(value) {
    SAVE_FLAG = value;
}

/**
 * @name setTaskContent
 * @function
 * @description helper function - set TASK_CONTENT for editing task
 * @param content is the task container
 */
function setTaskContent(content) {
    TASK_CONTENT = content;
}

/**
 * @name inputSanitizer
 * @function
 * @description helper function - set TASK_CONTENT for editing task
 * @param content is the task container
 */
function inputSanitizer(input) {
    if (input == "")
        return true;
    return false;
}


 // Export all functions
 export { addTaskButton, cancelTask, saveTask, createCustomTaskTag, clearTasksButton };
