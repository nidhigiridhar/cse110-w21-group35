/**
 * @name revealHelp
 * @function
 * @description Opens the help modal when the help button is clicked
 */
function revealHelp() {
    let helpModal = document.getElementById('helpModal');
    helpModal.style.display = 'block';
    document.getElementById('helpButton').disabled = true; 
    document.getElementById('closeModal').disabled = false; 
}

/**
 * @name hideHelp
 * @function
 * @description Closes the help modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 * @param {*} event The state of the help modal (open or closed)
 */
function hideHelp(event) {
    let helpModal = document.getElementById('helpModal');
    let closeModal = document.getElementById('closeModal');
    if (event.target == helpModal || event.target == closeModal) {
        helpModal.style.display = 'none';
    }
    document.getElementById('helpButton').disabled = false; 
    document.getElementById('closeModal').disabled = true; 
}

// export functions for testing
export { revealHelp, hideHelp }; 