const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
let currentActive = 0;

function progressBar() {
  currentActive++;
  update();
  if(currentActive == circles.length) {
    reset();
  }
}

function update() {
  circles.forEach((circle,idx) => {
    if(idx < currentActive) {
      circle.classList.add("deactive");
    }
  });
}

function reset() {
  circles.forEach((circle,idx) => {
    circle.classList.remove("deactive");
  });
  currentActive = 0;
}

var module = module || {};
module.exports = { progressBar };

