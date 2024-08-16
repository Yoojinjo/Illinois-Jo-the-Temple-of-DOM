/* made some buttons. clicking on directions will modify the text area to explain the game. clicking on the start button will hide the buttons and begin the game loop. 
features needed. a score tracker, a life counter that updates.
game loop?
game over condition */

const directionButton = document.getElementById("directions");
const startButton = document.getElementById("start");
const textArea = document.getElementById("text-area");
const text = document.getElementById("text");
const gamezone = document.getElementById("gamezone");
const menu = document.getElementById("menu");
const bankButton = document.getElementById("bank");
let score = 0;
let bank = 10;
let strikes = 0;
let boxCount = 0;

directionButton.addEventListener("click", () => {
    text.innerText =
        "Each box you open adds a random number of points. Every new box costs. Bank points to keep them";
});

startButton.addEventListener("click", () => {
    makeLoot();
    score--;
    scoreUpdate();
});

function scoreUpdate() {
    text.innerText = `You got ${lootResult} points. ScorePoints: ${score}, Bank: ${bank}`;
    // startButton.innerText = `RollingScore: ${score}`;
    bankButton.innerText = `Add ${score} ScorePoints to Bank: ${bank}`;
}

function makeLoot() {
    boxCount++;
    startButton.innerText = "Another Box! (Minus -1 point)";
    const makeLootBox = document.createElement("lootBox");
    makeLootBox.innerText = "Loot Box";
    gamezone.appendChild(makeLootBox);
    goLoot();
    scoreUpdate();
}

// function onclick of loot box, the score will change by a random amount

function goLoot() {
    const lootBox = document.querySelector("lootbox");

    // colors change on mouse hover
    const colors = ['yellow', 'green', 'blue', 'purple', 'red', 'orange'];
    let colorInterval;
    lootBox.addEventListener("mouseover", mouseOver);
    function mouseOver() {
        colorInterval = setInterval(()=>{
        lootBox.style.background = colors[Math.floor(Math.random()*colors.length)];
    }, 50)}

// stop colorchange
    lootBox.addEventListener("mouseout", mouseOut);
    function mouseOut() {
        clearInterval(colorInterval);
        lootBox.style.background = "yellow";
    }

    lootBox.addEventListener("click", () => {
        lootResult = Math.floor((Math.random() - 0.3) * 10);
        score += lootResult;
        text.innerText = `You got ${lootResult} points. ScorePoints: ${score}, Bank: ${bank}`;
        const clickedbox = document.querySelector("lootbox");
        lootBox.remove(clickedbox);
        scoreUpdate();
        goLoot();
    });
}

// clicking bank will add score to bank, reset score points and remove the loot box

bankButton.addEventListener("click", () => {
    bank += score;
    score = 0;
    text.innerHTML = `You banked your winnings. Current score: ${score}, Bank: ${bank}`;
    scoreUpdate();
});
