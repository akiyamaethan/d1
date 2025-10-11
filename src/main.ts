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
    >Increase Hug Strength for <span id="tier2UpgradePrice">100</span> bears</button>
  <button
    id="tier3UpgradeButton"
    disabled
    >Join a Sewing Circle for <span id="tier3UpgradePrice">100</span> bears</button>
  <p>Bears: <span id="bearDisplay">0</span></p>
  <p>Idle bps: <span id="bpsDisplay">0</span></p> 
  <p>
    🖱️:<span id="tier1UpgradeDisplay">0</span>
    💪: <span id="tier2UpgradeDisplay">0</span>
    🧶: <span id="tier3UpgradeDisplay">0</span>
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

interface Upgrade {
  name: string;
  price: number;
  bpsIncrease: number;
  clickIncrease: number;
  amount: number;
  upgradeButton: HTMLButtonElement;
  upgradeDisplay: HTMLElement;
  upgradePriceDisplay: HTMLElement;
  onClick: () => void;
}

const availableUpgrades: Upgrade[] = [
  {
    name: "Autohugger",
    price: 10,
    bpsIncrease: .2,
    clickIncrease: 0,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier1UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById(
      "tier1UpgradeDisplay",
    ) as HTMLElement,
    upgradePriceDisplay: document.getElementById(
      "tier1UpgradePrice",
    ) as HTMLElement,
    onClick: () => handleUpgradeClick(availableUpgrades[0]),
  },
  {
    name: "Hug Strength",
    price: 100,
    bpsIncrease: 0,
    clickIncrease: 1,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier2UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById(
      "tier2UpgradeDisplay",
    ) as HTMLElement,
    upgradePriceDisplay: document.getElementById(
      "tier2UpgradePrice",
    ) as HTMLElement,
    onClick: () => handleUpgradeClick(availableUpgrades[1]),
  },
  {
    name: "Sewing Circle",
    price: 1000,
    bpsIncrease: 5,
    clickIncrease: 0,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier3UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById(
      "tier3UpgradeDisplay",
    ) as HTMLElement,
    upgradePriceDisplay: document.getElementById(
      "tier3UpgradePrice",
    ) as HTMLElement,
    onClick: () => handleUpgradeClick(availableUpgrades[2]),
  },
];

function handleUpgradeClick(upgrade: Upgrade) {
  if (currentBears >= upgrade.price) {
    currentBears -= upgrade.price;
    upgrade.price = Math.floor(upgrade.price * 1.2);
    upgrade.amount += 1;
    automaticIncrement += upgrade.bpsIncrease;
    clickIncrement += upgrade.clickIncrease;
    upgrade.upgradeDisplay.textContent = upgrade.amount.toString();
    bpsDisplay!.textContent = automaticIncrement.toFixed(2);
    upgrade.upgradePriceDisplay.textContent = upgrade.price.toString();
  }
}

availableUpgrades.forEach((upgrade) => {
  upgrade.upgradeButton.addEventListener("click", () => upgrade.onClick());
});

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
  availableUpgrades.forEach((upgrade) => {
    if (currentBears >= upgrade.price) {
      upgrade.upgradeButton.disabled = false;
    } else {
      upgrade.upgradeButton.disabled = true;
    }
  });
  requestAnimationFrame(updateUpgradesDisplay);
}

requestAnimationFrame(updateUpgradesDisplay);
