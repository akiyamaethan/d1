import "./style.css";

document.body.innerHTML = `

  <button
    id="bearButton"
    style="font-size: 100px; background: none; border: none; cursor: pointer;"
  >🐻</button>
  <button
    id="tier1UpgradeButton"
    disabled
    >Purchase Autoclicker</button>
  <button>upgrade</button>
  <button>upgrade</button>
  <p>Bears: <span id="bearDisplay">0</span></p>
  <p>🖱️:<span id="tier1UpgradeDisplay">0</span></p>

  `;

const bearButton = document.getElementById("bearButton");
const bearDisplay = document.getElementById("bearDisplay");
const tier1UpgradeButton = document.getElementById(
  "tier1UpgradeButton",
) as HTMLButtonElement;
const tier1UpgradeDisplay = document.getElementById("tier1UpgradeDisplay");

let automaticIncrement: number = 0;
const clickIncrement: number = 1;
let currentBears: number = 0;
let currentTier1Upgrades: number = 0;
let prevTime = performance.now();
let currentTime = performance.now();

// Event listener for bear button click
if (bearButton && bearDisplay) {
  bearButton.addEventListener("click", () => {
    currentBears += clickIncrement;
    updateBearDisplay();
  });
}

// Event listener for tier 1 upgrade button click
if (tier1UpgradeButton && tier1UpgradeDisplay) {
  tier1UpgradeButton.addEventListener("click", () => {
    if (currentBears >= 10) {
      currentBears -= 10;
      currentTier1Upgrades += 1;
      automaticIncrement += 1;
      tier1UpgradeDisplay.textContent = currentTier1Upgrades.toString();
    }
  });
}

function automaticIncrementer(deltaTime: number) {
  currentBears += (deltaTime / 1000) * automaticIncrement;
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

function updateUpgradesDisplay() {
  if (tier1UpgradeButton && tier1UpgradeDisplay) {
    //check for upgrade 1
    if (currentBears >= 10) {
      tier1UpgradeButton.disabled = false;
    }
    requestAnimationFrame(updateUpgradesDisplay);
  }
}
requestAnimationFrame(updateUpgradesDisplay);
