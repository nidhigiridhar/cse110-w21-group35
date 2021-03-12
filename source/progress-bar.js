const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');
let currentDeactive = 0;

/**
 * @name progressBar
 * @function
 * @description Updates the progress bar depending on the state that most recently finished
 */
function progressBar() {
  currentDeactive++;
  update();
  if(currentDeactive == circles.length) {
    reset();
  }
}

/**
 * @name update
 * @function
 * @description Deactivates a circle when a state finishes
 */
function update() {
  circles.forEach((circle,idx) => {
    if(idx < currentDeactive) {
      circle.classList.add('deactive');
    }
  });
}

/**
 * @name reset
 * @function
 * @description Resets the progress bar and reactivates all circle when a long break finishes
 */
function reset() {
  circles.forEach((circle,idx) => {
    circle.classList.remove('deactive');
  });
  currentDeactive = 0;
}

// export functions and variables for testing
export { progress, circles, currentDeactive, progressBar, update, reset };

