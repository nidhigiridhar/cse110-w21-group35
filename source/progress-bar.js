const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
let currentDeactive = 0;

function progressBar() {
  currentDeactive++;
  update();
  if(currentDeactive == circles.length) {
    reset();
  }
}

function update() {
  circles.forEach((circle,idx) => {
    if(idx < currentDeactive) {
      circle.classList.add("deactive");
    }
  });
}

function reset() {
  circles.forEach((circle,idx) => {
    circle.classList.remove("deactive");
  });
  currentDeactive = 0;
}

var module = module || {};
export { progressBar };

