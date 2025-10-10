import "./style.css";

//Hi Section activity commit

document.body.innerHTML = `

  <button
    id="bearButton"
    style="font-size: 100px; background: none; border: none; cursor: pointer;"
  >🐻</button>
  <button
    id="tier1UpgradeButton"
    disabled
    >Purchase Autoclicker A</button>
  <button
    id="tier2UpgradeButton"
    disabled
    >Learn to Make Bears B</button>
  <button>upgrade</button>
  <p>Bears: <span id="bearDisplay">0</span></p>
  <p>Idle bps: <span id="bpsDisplay">0</span></p> 
  <p>
    🖱️:<span id="tier1UpgradeDisplay">0</span>
    🧶: <span id="tier2UpgradeDisplay">0</span>
  </p>

  `;

const bearButton = document.getElementById("bearButton");
const bearDisplay = document.getElementById("bearDisplay");
const bpsDisplay = document.getElementById("bpsDisplay");
const tier1UpgradeButton = document.getElementById(
  "tier1UpgradeButton",
) as HTMLButtonElement;
const tier2UpgradeButton = document.getElementById(
  "tier2UpgradeButton",
) as HTMLButtonElement;
const tier1UpgradeDisplay = document.getElementById("tier1UpgradeDisplay");
const tier2UpgradeDisplay = document.getElementById("tier2UpgradeDisplay");

let automaticIncrement: number = 0;
const clickIncrement: number = 1;
let currentBears: number = 0;
let currentTier1Upgrades: number = 0;
let currentTier2Upgrades: number = 0;
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
if (tier1UpgradeButton && tier1UpgradeDisplay && bpsDisplay) {
  tier1UpgradeButton.addEventListener("click", () => {
    if (currentBears >= 10) {
      currentBears -= 10;
      currentTier1Upgrades += 1;
      automaticIncrement += 1;
      tier1UpgradeDisplay.textContent = currentTier1Upgrades.toString();
      bpsDisplay.textContent = automaticIncrement.toString();
    }
  });
}

if (tier2UpgradeButton && tier2UpgradeDisplay && bpsDisplay) {
  tier2UpgradeButton.addEventListener("click", () => {
    if (currentBears >= 100) {
      currentBears -= 100;
      currentTier2Upgrades += 1;
      automaticIncrement += 5;
      tier2UpgradeDisplay.textContent = currentTier2Upgrades.toString();
      bpsDisplay.textContent = automaticIncrement.toString();
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
    //check for upgrade 2
    if (currentBears >= 100) {
      tier2UpgradeButton.disabled = false;
    }
  }
}
requestAnimationFrame(updateUpgradesDisplay);
