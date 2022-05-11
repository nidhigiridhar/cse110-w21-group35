/**
 * @name revealHelp
 * @function
 * @description Opens the help modal when the help button is clicked
 */
function revealHelp() {
    let help-modal = document.getElementById('help-modal');
    help-modal.style.display = 'block';
    document.getElementById('help-button').disabled = true; 
}

/**
 * @name hideHelp
 * @function
 * @description Closes the help modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 */
function hideHelp() {
    let help-modal = document.getElementById('help-modal');
    help-modal.style.display = 'none';
    document.getElementById('help-button').disabled = false; 
}

// export functions for testing
export { revealHelp, hideHelp }; 