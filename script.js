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
const bankButton = document.getElementById("bank")
let score = 0;
let bank = 10

directionButton.addEventListener("click", () => {
    text.innerHTML = "Each box you open adds a random number of points. Every new box loses you some points";
});

startButton.addEventListener("click", () => {
    text.innerHTML = `Your points: ${score}, Your bank: ${bank}`;
    makeLoop();
    bank--;
});

function makeLoop() {
    startButton.innerText = "Another Box!";
    const makeLootBox = document.createElement("lootBox");
    makeLootBox.innerText = "Loot Box";
    gamezone.appendChild(makeLootBox);
    goLoot();
}

// function onclick of loot box, the score will change by a random amount
function goLoot() {
    const lootBox = document.querySelector("lootbox");
    lootBox.addEventListener("click", () => {
        lootResult = Math.floor((Math.random() - 0.4 )* 10);
        score += lootResult;
        text.innerHTML = `You got ${lootResult} points. Current score: ${score}, Bank: ${bank}`;
        const clickedbox = document.querySelector("lootbox")
        clickedbox.remove()
    });
}

// clicking bank will add score to bank, reset score points and remove the loot box

bankButton.addEventListener("click", ()=>{
    bank += score;
    score = 0;
    text.innerHTML = `You banked your winnings. Current score: ${score}, Bank: ${bank}`;
})
