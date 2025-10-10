import "./style.css";

//Hi Section activity commit

document.body.innerHTML = `
  <center>
  <h1>Bear Hugger</h1>
  <p>Click (hug) teddy bears to wake them up!</p>
  <button
    id="bearButton"
    style="font-size: 100px; background: none; border: none; cursor: pointer;"
  >🧸</button>
  <center>
  <button
    id="tier1UpgradeButton"
    disabled
    >Purchase Autohugger for <span id="tier1UpgradePrice">10</span> bears</button>
  <button
    id="tier2UpgradeButton"
    disabled
    >Learn to Make Bears for <span id="tier2UpgradePrice">100</span> bears</button>
  <button
    id="tier3UpgradeButton"
    disabled
    >Increase Hug Strength for <span id="tier3UpgradePrice">100</span> bears</button>
  <p>Bears: <span id="bearDisplay">0</span></p>
  <p>Idle bps: <span id="bpsDisplay">0</span></p> 
  <p>
    🖱️:<span id="tier1UpgradeDisplay">0</span>
    🧶: <span id="tier2UpgradeDisplay">0</span>
    💪: <span id="tier3UpgradeDisplay">0</span>
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
const tier3UpgradeButton = document.getElementById(
  "tier3UpgradeButton",
) as HTMLButtonElement;
const tier1UpgradeDisplay = document.getElementById("tier1UpgradeDisplay");
const tier2UpgradeDisplay = document.getElementById("tier2UpgradeDisplay");
const tier3UpgradeDisplay = document.getElementById("tier3UpgradeDisplay");
const tier1PriceDisplay = document.getElementById("tier1UpgradePrice");
const tier2PriceDisplay = document.getElementById("tier2UpgradePrice");
const tier3PriceDisplay = document.getElementById("tier3UpgradePrice");
let currentTier1Upgrades: number = 0;
let tier1UpgradePrice: number = 10;
let currentTier2Upgrades: number = 0;
let tier2UpgradePrice: number = 100;
let currentTier3Upgrades: number = 0;
let tier3UpgradePrice: number = 1000;

let automaticIncrement: number = 0;
let clickIncrement: number = 1;
let currentBears: number = 0;

let prevTime = performance.now();
let currentTime = performance.now();

// Event listener for bear button click
if (bearButton && bearDisplay) {
  bearButton.addEventListener("click", () => {
    bearButton.classList.add("bear-button-animate");
    bearButton.addEventListener("animationend", () => {
      bearButton.classList.remove("bear-button-animate");
    }, { once: true });
    currentBears += clickIncrement;
    updateBearDisplay();
  });
}

// Event listener for tier 1 upgrade button click
if (
  tier1UpgradeButton && tier1UpgradeDisplay && bpsDisplay && tier1PriceDisplay
) {
  tier1UpgradeButton.addEventListener("click", () => {
    if (currentBears >= tier1UpgradePrice) {
      currentBears -= tier1UpgradePrice;
      tier1UpgradePrice = Math.floor(tier1UpgradePrice * 1.2);
      currentTier1Upgrades += 1;
      automaticIncrement += 1;
      tier1UpgradeDisplay.textContent = currentTier1Upgrades.toString();
      bpsDisplay.textContent = automaticIncrement.toString();
      tier1PriceDisplay.textContent = tier1UpgradePrice.toString();
    }
  });
}

if (
  tier2UpgradeButton && tier2UpgradeDisplay && bpsDisplay && tier2PriceDisplay
) {
  tier2UpgradeButton.addEventListener("click", () => {
    if (currentBears >= tier2UpgradePrice) {
      currentBears -= tier2UpgradePrice;
      tier2UpgradePrice = Math.floor(tier2UpgradePrice * 1.2);
      currentTier2Upgrades += 1;
      automaticIncrement += 5;
      tier2UpgradeDisplay.textContent = currentTier2Upgrades.toString();
      bpsDisplay.textContent = automaticIncrement.toString();
      tier2PriceDisplay.textContent = tier2UpgradePrice.toString();
    }
  });
}

if (tier3UpgradeButton && tier3UpgradeDisplay && tier3PriceDisplay) {
  tier3UpgradeButton.addEventListener("click", () => {
    if (currentBears >= tier3UpgradePrice) {
      currentBears -= tier3UpgradePrice;
      tier3UpgradePrice = Math.floor(tier3UpgradePrice * 1.2);
      currentTier3Upgrades += 1;
      clickIncrement += 1;
      tier3UpgradeDisplay.textContent = currentTier3Upgrades.toString();
      tier3PriceDisplay.textContent = tier3UpgradePrice.toString();
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
  if (tier1UpgradeButton && tier2UpgradeButton && tier3UpgradeButton) {
    //check for upgrade 1
    if (currentBears >= tier1UpgradePrice) {
      tier1UpgradeButton.disabled = false;
    } else {
      tier1UpgradeButton.disabled = true;
    }
    //check for upgrade 2
    if (currentBears >= tier2UpgradePrice) {
      tier2UpgradeButton.disabled = false;
    } else {
      tier2UpgradeButton.disabled = true;
    }
    //check for upgrade 3
    if (currentBears >= tier3UpgradePrice) {
      tier3UpgradeButton.disabled = false;
    } else {
      tier3UpgradeButton.disabled = true;
    }
    requestAnimationFrame(updateUpgradesDisplay);
  }
}
requestAnimationFrame(updateUpgradesDisplay);
