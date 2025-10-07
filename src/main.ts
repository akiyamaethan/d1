import "./style.css";

let currentBears: number = 0;

document.body.innerHTML = `
  <button id="bearButton">🐻</button>
  <p>Bears: <span id="bearDisplay">0</span></p>
`;

const bearButton = document.getElementById("bearButton");
const bearDisplay = document.getElementById("bearDisplay");

if (bearButton && bearDisplay) {
  bearButton.addEventListener("click", () => {
    currentBears += 1;
    bearDisplay.textContent = currentBears.toString();
  });
}
