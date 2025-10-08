import "./style.css";

document.body.innerHTML = `
  <button id="bearButton">🐻</button>
  <p>Bears: <span id="bearDisplay">0</span></p>
`;

const bearButton = document.getElementById("bearButton");
const bearDisplay = document.getElementById("bearDisplay");

const automaticIncrement: number = 1;
let currentBears: number = 0;
const _automaticClicking = setInterval(automaticIncrementer, 1000);

if (bearButton && bearDisplay) {
  bearDisplay.textContent = currentBears.toString();
  bearButton.addEventListener("click", () => {
    currentBears += 1;
    updateBearDisplay();
  });
}

function automaticIncrementer() {
  currentBears += automaticIncrement;
}

function updateBearDisplay() {
  if (bearDisplay) {
    bearDisplay.textContent = currentBears.toString();
  }
}
