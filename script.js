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
const resetButton = document.getElementById("reset");
const extraInfoSpace = document.getElementById("extra-info");
const scoreInfoSpace = document.getElementById("score");
const strikeZone = document.getElementById("strikeZone");

let score = 0;
let bank = 0;
let strikes = 0;
let boxCount = 0;

directionButton.addEventListener("click", () => {
    extraInfoSpace.innerText =
        "Each box you open adds a random number of points. Every new box costs a point from your Bank. If you get 3 strikes, you lose all your points. Banked points can't be lost to on a strikeout.";
});

startButton.addEventListener("click", () => {
    makeLoot();
});

resetButton.addEventListener("click", () => {
    score = 0;
    bank = 0;
    strikes = 0;
    extraInfoSpace.innerHTML = "";
    scoreInfoSpace.innerHTML = "";

    return score, bank, strikes;
});

function scoreUpdate() {
    // text.innerText = `You got ${lootResult} points. ScorePoints: ${score}, Bank: ${bank}`;
    // startButton.innerText = `RollingScore: ${score}`;
    // bankButton.innerText = `Add ${score} ScorePoints to Bank: ${bank}`;
}

function makeLoot() {
    boxCount++;
    text.innerText = "How far can you push your luck?";
    // bankButton.innerText = `Bank: ${bank}`;
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
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    let colorInterval;
    lootBox.addEventListener("mouseover", mouseOver);
    function mouseOver() {
        colorInterval = setInterval(() => {
            lootBox.style.background =
                colors[Math.floor(Math.random() * colors.length)];
        }, 50);
    }

    // stop colorchange if not clicked
    lootBox.addEventListener("mouseout", mouseOut);
    function mouseOut() {
        clearInterval(colorInterval);
        lootBox.style.background = "yellow";
    }

    lootBox.addEventListener("click", () => {
        lootResult = Math.floor(Math.random() * 10);
        score += lootResult;
        scoreInfoSpace.innerHTML = `You got ${lootResult} points. <br> ScorePoints: ${score}, Bank: ${bank}`;
        const clickedbox = document.querySelector("lootbox");

        // add strikes for red and orange
        if (clickedbox.style.background == "red") {
            console.log("2 strikes");
            extraInfoSpace.innerHTML = `Very unlucky. You got 2 strikes!`;
            strikes++;
            strikes++;
        } else if (clickedbox.style.background == "orange") {
            console.log("1 strikes");
            extraInfoSpace.innerHTML = `You got a strike, be more careful!`;
            strikes++;
        }
        if (strikes == 1) {
            document.getElementById("strike1").style.visibility = "visible";
        } if (strikes == 2) {
            document.getElementById("strike2").style.visibility = "visible";
        } if (strikes == 3) {
            document.getElementById("strike3").style.visibility = "visible";
            console.log("Game over");
            gamezone.innerHTML = `You struck out!! <br> Your game ends here!!`;
        }

        // clear box
        clearInterval(colorInterval);
        lootBox.addEventListener("mouseout", mouseOut);
        function mouseOut() {
            // lootBox.remove(clickedbox);
            text.innerHTML = "";
        }
        scoreUpdate();
        // goLoot();
    });
}

// clicking bank will add score to bank, reset score points and remove the loot box

// bankButton.addEventListener("click", () => {
//     bank += score;
//     score = 0;
//     text.innerHTML = `You banked your winnings. Current score: ${score}, Bank: ${bank}`;
//     scoreUpdate();
// });
