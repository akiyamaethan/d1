import "./style.css";
//brace is smoking
//Custom types:
interface Upgrade {
  name: string;
  description: string;
  price: number;
  bpsIncrease: number;
  clickIncrease: number;
  amount: number;
  upgradeButton: HTMLButtonElement;
  upgradeDisplay: HTMLElement;
  upgradePriceDisplay: HTMLElement;
  upgradeDescripton: HTMLElement;
  onClick: () => void;
}

const availableUpgrades: Upgrade[] = [
  {
    name: "Autohugger",
    description: "Hire a child to hug 0.2 bps for you.",
    price: 10,
    bpsIncrease: 0.2,
    clickIncrease: 0,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier1UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById("tier1UpgradeDisplay")!,
    upgradePriceDisplay: document.getElementById("tier1UpgradePrice")!,
    upgradeDescripton: document.getElementById("tier1UpgradeDescription")!,
    onClick: () => handleUpgradeClick(availableUpgrades[0]),
  },
  {
    name: "Hug Strength",
    description:
      "Hit the gym to increase the strength of your hugs by 1 bear per click.",
    price: 100,
    bpsIncrease: 0,
    clickIncrease: 1,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier2UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById("tier2UpgradeDisplay")!,
    upgradePriceDisplay: document.getElementById("tier2UpgradePrice")!,
    upgradeDescripton: document.getElementById("tier2UpgradeDescription")!,
    onClick: () => handleUpgradeClick(availableUpgrades[1]),
  },
  {
    name: "Sewing Circle",
    description: "Manipulate a sewing circle into making you 2.5 bps.",
    price: 500,
    bpsIncrease: 2.5,
    clickIncrease: 0,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier3UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById("tier3UpgradeDisplay")!,
    upgradePriceDisplay: document.getElementById("tier3UpgradePrice")!,
    upgradeDescripton: document.getElementById("tier3UpgradeDescription")!,
    onClick: () => handleUpgradeClick(availableUpgrades[2]),
  },
  {
    name: "Bear Factory",
    description: "Open a bear factory to produce 10 bps.",
    price: 1000,
    bpsIncrease: 10,
    clickIncrease: 0,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier4UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById("tier4UpgradeDisplay")!,
    upgradePriceDisplay: document.getElementById("tier4UpgradePrice")!,
    upgradeDescripton: document.getElementById("tier4UpgradeDescription")!,
    onClick: () => handleUpgradeClick(availableUpgrades[3]),
  },
  {
    name: "Fur Exchange",
    description: "Invest in the black market fur exchange to gain 25 bps.",
    price: 2000,
    bpsIncrease: 25,
    clickIncrease: 0,
    amount: 0,
    upgradeButton: document.getElementById(
      "tier5UpgradeButton",
    ) as HTMLButtonElement,
    upgradeDisplay: document.getElementById("tier5UpgradeDisplay")!,
    upgradePriceDisplay: document.getElementById("tier5UpgradePrice")!,
    upgradeDescripton: document.getElementById("tier5UpgradeDescription")!,
    onClick: () => handleUpgradeClick(availableUpgrades[4]),
  },
];

//State vars:
let automaticIncrement: number = 0;
let clickIncrement: number = 1;
let currentBears: number = 0;

let prevTime = performance.now();
let currentTime = performance.now();

//UI creation:
const center = document.createElement("center");
const title = document.createElement("h1");
title.textContent = "Bear Hugger";
center.appendChild(title);

const subtitle = document.createElement("p");
subtitle.textContent = "Click (hug) teddy bears to wake them up!";
center.appendChild(subtitle);

const bearButton = document.createElement("button");
bearButton.id = "bearButton";
bearButton.style.fontSize = "100px";
bearButton.style.background = "none";
bearButton.style.border = "none";
bearButton.style.cursor = "pointer";
bearButton.textContent = "🧸";
center.appendChild(bearButton);

const section = document.createElement("section");

function createUpgradeElement(
  id: number,
  label: string,
  price: number,
): HTMLElement {
  const container = document.createElement("div");

  const button = document.createElement("button");
  button.id = `tier${id}UpgradeButton`;
  button.disabled = true;
  button.innerHTML =
    `Purchase ${label} for <span id="tier${id}UpgradePrice">${price}</span> bears`;
  container.appendChild(button);

  const desc = document.createElement("span");
  desc.id = `tier${id}UpgradeDescription`;
  container.appendChild(desc);

  return container;
}

section.appendChild(createUpgradeElement(1, "Autohugger", 10));
section.appendChild(createUpgradeElement(2, "Increase Hug Strength", 100));
section.appendChild(createUpgradeElement(3, "Join a Sewing Circle", 500));
section.appendChild(createUpgradeElement(4, "Open a Bear Factory", 1000));
section.appendChild(
  createUpgradeElement(5, "Invest in the Fur Exchange", 2000),
);

center.appendChild(section);

const bearP = document.createElement("p");
bearP.innerHTML = `Bears: <span id="bearDisplay">0</span>`;
center.appendChild(bearP);

const bpsP = document.createElement("p");
bpsP.innerHTML = `Idle bps: <span id="bpsDisplay">0</span>`;
center.appendChild(bpsP);

const upgradeDisplayP = document.createElement("p");
upgradeDisplayP.innerHTML = `
  🖱️:<span id="tier1UpgradeDisplay">0</span>
  💪:<span id="tier2UpgradeDisplay">0</span>
  🧶:<span id="tier3UpgradeDisplay">0</span>
  🏭:<span id="tier4UpgradeDisplay">0</span>
  💱:<span id="tier5UpgradeDisplay">0</span>
`;
center.appendChild(upgradeDisplayP);

document.body.appendChild(center);

const bearDisplay = document.getElementById("bearDisplay")!;
const bpsDisplay = document.getElementById("bpsDisplay")!;

//Event handlers + game logic:
function handleUpgradeClick(upgrade: Upgrade) {
  if (currentBears >= upgrade.price) {
    currentBears -= upgrade.price;
    upgrade.price = Math.floor(upgrade.price * 1.2);
    upgrade.amount += 1;
    automaticIncrement += upgrade.bpsIncrease;
    clickIncrement += upgrade.clickIncrease;
    upgrade.upgradeDisplay.textContent = upgrade.amount.toString();
    bpsDisplay.textContent = automaticIncrement.toFixed(2);
    upgrade.upgradePriceDisplay.textContent = upgrade.price.toString();
  }
}

availableUpgrades.forEach((upgrade) => {
  upgrade.upgradeButton.addEventListener("click", upgrade.onClick);
  upgrade.upgradeDescripton.textContent = upgrade.description;
});

bearButton.addEventListener("click", () => {
  bearButton.classList.add("bear-button-animate");
  bearButton.addEventListener(
    "animationend",
    () => bearButton.classList.remove("bear-button-animate"),
    { once: true },
  );
  currentBears += clickIncrement;
  updateBearDisplay();
});

function automaticIncrementer(deltaTime: number) {
  currentBears += (deltaTime / 1000) * automaticIncrement;
}

function updateBearDisplay() {
  currentTime = performance.now();
  const deltaTime = currentTime - prevTime;
  automaticIncrementer(deltaTime);
  prevTime = currentTime;
  bearDisplay.textContent = currentBears.toFixed(2);
  requestAnimationFrame(updateBearDisplay);
}
requestAnimationFrame(updateBearDisplay);

function updateUpgradesDisplay() {
  availableUpgrades.forEach((upgrade) => {
    upgrade.upgradeButton.disabled = currentBears < upgrade.price;
  });
  requestAnimationFrame(updateUpgradesDisplay);
}
requestAnimationFrame(updateUpgradesDisplay);
