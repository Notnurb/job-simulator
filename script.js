const jobs = [
    { name: "Software Developer", baseSalary: 100 },
    { name: "Teacher", baseSalary: 80 },
    { name: "Chef", baseSalary: 90 },
    { name: "Doctor", baseSalary: 150 },
    { name: "Cashier", baseSalary: 40 },
    { name: "Electrician", baseSalary: 95 },
    { name: "Artist", baseSalary: 70 },
    { name: "Scientist", baseSalary: 130 },
    { name: "Musician", baseSalary: 75 },
    { name: "Mechanic", baseSalary: 85 },
    { name: "Farmer", baseSalary: 60 },
    { name: "Taxi Driver", baseSalary: 55 },
    { name: "Pilot", baseSalary: 160 },
    { name: "Firefighter", baseSalary: 100 },
    { name: "Police Officer", baseSalary: 95 },
    { name: "Construction Worker", baseSalary: 65 },
    { name: "Plumber", baseSalary: 90 },
    { name: "Web Designer", baseSalary: 110 },
    { name: "Barista", baseSalary: 45 },
    { name: "Librarian", baseSalary: 50 },
    { name: "Data Analyst", baseSalary: 120 },
    { name: "UI/UX Designer", baseSalary: 115 },
    { name: "Gamer", baseSalary: 70 },
    { name: "Streamer", baseSalary: 80 },
    { name: "Influencer", baseSalary: 85 },
    { name: "Entrepreneur", baseSalary: 200 }
];

const upgrades = [
    { name: "Basic Computer", cost: 100, bonus: 10 },
    { name: "Gaming PC", cost: 300, bonus: 30 },
    { name: "Quantum Rig", cost: 1000, bonus: 100 },
    { name: "Wood Desk", cost: 50, bonus: 5 },
    { name: "Standing Desk", cost: 150, bonus: 15 },
    { name: "Futuristic Desk", cost: 500, bonus: 50 },
    { name: "Office Chair", cost: 60, bonus: 6 },
    { name: "Ergonomic Chair", cost: 180, bonus: 18 },
    { name: "Massage Chair", cost: 600, bonus: 60 },
    { name: "Coffee Machine", cost: 80, bonus: 8 },
    { name: "Premium Coffee", cost: 200, bonus: 20 },
    { name: "Phone", cost: 100, bonus: 10 },
    { name: "Smartphone", cost: 250, bonus: 25 },
    { name: "Super Smartphone", cost: 750, bonus: 75 },
    { name: "Whiteboard", cost: 40, bonus: 4 },
    { name: "Virtual Assistant", cost: 500, bonus: 50 },
    { name: "AI Assistant", cost: 1500, bonus: 150 },
    { name: "Art Kit", cost: 90, bonus: 9 },
    { name: "Tablet", cost: 200, bonus: 20 },
    { name: "Second Monitor", cost: 120, bonus: 12 },
    { name: "Ultra Monitor", cost: 400, bonus: 40 },
    { name: "Bookshelf", cost: 70, bonus: 7 },
    { name: "Library Access", cost: 300, bonus: 30 },
    { name: "Fitness Pass", cost: 100, bonus: 10 },
    { name: "Personal Trainer", cost: 350, bonus: 35 },
    { name: "VR Setup", cost: 600, bonus: 60 },
    { name: "3D Printer", cost: 700, bonus: 70 },
    { name: "Decor Items", cost: 60, bonus: 6 },
    { name: "Executive Suite", cost: 2000, bonus: 200 },
    { name: "Private Office", cost: 1000, bonus: 100 }
];

let currentJob = null;
let money = 0;
let salary = 0;
let ownedUpgrades = {};

function populateJobs() {
    const selector = document.getElementById("jobSelector");
    jobs.forEach(job => {
        const option = document.createElement("option");
        option.value = job.name;
        option.textContent = job.name;
        selector.appendChild(option);
    });
}

function selectJob() {
    const jobName = document.getElementById("jobSelector").value;
    const job = jobs.find(j => j.name === jobName);
    if (job) {
        currentJob = job;
        salary = job.baseSalary;
        document.getElementById("currentJob").textContent = job.name;
        document.getElementById("salary").textContent = salary;
        document.querySelector(".main-ui").classList.remove("hidden");
        save();
    }
}

function doWork() {
    money += salary;
    updateStats();
    save();
}

function requestRaise() {
    if (Math.random() < 0.5) {
        const raise = Math.floor(Math.random() * 20) + 10;
        salary += raise;
        alert("Raise approved! +" + raise);
        document.getElementById("salary").textContent = salary;
        save();
    } else {
        alert("Raise denied.");
    }
}

function takeBreak() {
    alert("You feel refreshed. (Nothing happened)");
}

function populateShop() {
    const shopDiv = document.getElementById("shopItems");
    upgrades.forEach(item => {
        const el = document.createElement("div");
        el.innerHTML = `
            <strong>${item.name}</strong><br>
            Cost: $${item.cost}<br>
            Bonus: +${item.bonus}<br>
            <button onclick="buyUpgrade('${item.name}')">Buy</button>
        `;
        shopDiv.appendChild(el);
    });
}

function buyUpgrade(name) {
    const item = upgrades.find(u => u.name === name);
    if (money >= item.cost) {
        money -= item.cost;
        salary += item.bonus;
        ownedUpgrades[name] = (ownedUpgrades[name] || 0) + 1;
        updateInventory();
        updateStats();
        save();
    } else {
        alert("Not enough money!");
    }
}

function updateInventory() {
    const invDiv = document.getElementById("inventoryItems");
    invDiv.innerHTML = "";
    for (const name in ownedUpgrades) {
        const el = document.createElement("div");
        el.innerHTML = `${name} (x${ownedUpgrades[name]})`;
        invDiv.appendChild(el);
    }
}

function updateStats() {
    document.getElementById("money").textContent = money;
    document.getElementById("salary").textContent = salary;
}

function save() {
    localStorage.setItem("jobSimSave", JSON.stringify({
        currentJob,
        money,
        salary,
        ownedUpgrades
    }));
}

function load() {
    const data = JSON.parse(localStorage.getItem("jobSimSave"));
    if (data) {
        currentJob = data.currentJob;
        money = data.money;
        salary = data.salary;
        ownedUpgrades = data.ownedUpgrades || {};
        if (currentJob) {
            document.getElementById("currentJob").textContent = currentJob.name;
            document.getElementById("salary").textContent = salary;
            document.querySelector(".main-ui").classList.remove("hidden");
        }
        updateStats();
        updateInventory();
    }
}

window.onload = () => {
    populateJobs();
    populateShop();
    load();
};

