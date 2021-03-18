/**
 * @name revealHelp
 * @function
 * @description Opens the help modal when the help button is clicked
 */
function revealHelp() {
    let helpModal = document.getElementById('helpModal');
    helpModal.style.display = 'block';
    document.getElementById('helpButton').disabled = true; 
}

/**
 * @name hideHelp
 * @function
 * @description Closes the help modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 */
function hideHelp() {
    let helpModal = document.getElementById('helpModal');
    helpModal.style.display = 'none';
    document.getElementById('helpButton').disabled = false; 
}

// export functions for testing
export { revealHelp, hideHelp }; 