import "./style.css";

document.body.innerHTML = `
  <button id="bearButton">🐻</button>
  <p>Bears: <span id="bearDisplay">0</span></p>
`;

const bearButton = document.getElementById("bearButton");
const bearDisplay = document.getElementById("bearDisplay");

const automaticIncrement: number = 1;
const clickIncrement: number = 1;
let currentBears: number = 0;
let prevTime = performance.now();
let currentTime = performance.now();


// Event listener for bear button click
if (bearButton && bearDisplay) {
  bearButton.addEventListener("click", () => {
    currentBears += clickIncrement;
    updateBearDisplay();
  });
}

function automaticIncrementer(deltaTime: number) {
  currentBears += (deltaTime/1000) * automaticIncrement;
}

function updateBearDisplay() {
  if (bearDisplay) {
    currentTime = performance.now();
    const deltaTime = currentTime - prevTime;
    automaticIncrementer(deltaTime);
    prevTime = currentTime;
    bearDisplay.textContent = currentBears.toFixed(2);
    requestAnimationFrame(updateBearDisplay);
  }
}
requestAnimationFrame(updateBearDisplay);
