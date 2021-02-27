/**
 * @name revealHelp
 * @description Opens the help modal when the help button is clicked
 */
function revealHelp() {
    helpModal = document.getElementById("help-modal");
    helpModal.style.display = "block";
    document.getElementById("helpButton").disabled = true; 
    document.getElementById("close-modal").disabled = false; 
}

/**
 * @name hideHelp
 * @description Closes the help modal when the 'x' inside the modal or anywhere outside of the modal is clicked
 * @param {*} event 
 */
function hideHelp(event) {
    helpModal = document.getElementById("help-modal");
    closeModal = document.getElementById("close-modal");
    if (event.target == helpModal || event.target == closeModal) {
        helpModal.style.display = "none";
    }
    document.getElementById("helpButton").disabled = false; 
    document.getElementById("close-modal").disabled = true; 
}

// event handlers for opening and closing the help modal
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("helpButton").addEventListener("click", revealHelp);
    document.getElementById("close-modal").addEventListener("click", hideHelp);
    window.onclick = hideHelp;
});