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
let extraInfoSpace = document.getElementById("extra-info");
const scoreInfoSpace = document.getElementById("score");
const strikeZone = document.getElementById("strikeZone");
const threeStrikes = document.getElementsByClassName("pic");

let score = 0;
let bank = 0;
let strikes = 0;

directionButton.addEventListener("click", () => {
    extraInfoSpace.innerText =
        "Each box you open adds a random number of points. If you get 3 strikes, you lose all your points. Decide when to stop and bank your points!";
});

startButton.addEventListener("click", () => {
    makeGoStop();
});

resetButton.addEventListener("click", () => {
    score = 0;
    bank = 0;
    strikes = 0;
    extraInfoSpace.innerHTML = "";
    scoreInfoSpace.innerHTML = "";
    gamezone.innerHTML = "";
    document.getElementById("strike1").style.visibility = "hidden";
    document.getElementById("strike2").style.visibility = "hidden";
    document.getElementById("strike3").style.visibility = "hidden";
});

function scoreUpdate() {
    // text.innerText = `You got ${lootResult} points. ScorePoints: ${score}, Bank: ${bank}`;
    // startButton.innerText = `RollingScore: ${score}`;
    // bankButton.innerText = `Add ${score} ScorePoints to Bank: ${bank}`;
}

function makeGoStop() {
    
    text.innerText = "How far can you push your luck?";
    // bankButton.innerText = `Bank: ${bank}`;
    const makeGo = document.createElement("go");
    makeGo.innerText = "GO";
    gamezone.appendChild(makeGo);
    const makeStop = document.createElement("stop");
    makeStop.innerText = "STOP";
    gamezone.appendChild(makeStop);

    goLoot();
    scoreUpdate();
}

function goLoot() {
    const goBox = document.querySelector("go");

    // colors change on mouse hover
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    let colorInterval;
    goBox.addEventListener("mouseover", mouseOver);
    function mouseOver() {
        colorInterval = setInterval(() => {
            goBox.style.background =
                colors[Math.floor(Math.random() * colors.length)];
        }, 50);
    }

    // stop colorchange if not clicked
    goBox.addEventListener("mouseout", mouseOut);
    function mouseOut() {
        clearInterval(colorInterval);
        goBox.style.background = "green";
    }
    // SCORING onclick of loot box, the score will change by a random amount
    goBox.addEventListener("click", () => {
        
        lootResult = Math.floor(Math.random() * 10);
        score += lootResult;
        scoreInfoSpace.innerHTML = `You got ${lootResult} points. <br> Temporary Score: ${score}, Bank: ${bank}`;

        const clickedbox = document.querySelector("go");
        // add strikes for red and orange
        if (clickedbox.style.background == "red") {
            console.log("2 strikes");
            extraInfoSpace.innerHTML = `Very unlucky. You got 2 strikes!`;
            strikes++;
            strikes++;
        }
        if (clickedbox.style.background == "orange") {
            console.log("1 strikes");
            extraInfoSpace.innerHTML = `You got a strike, be more careful!`;
            strikes++;
        }

        // strike counter
        if (strikes >= 1) {
            document.getElementById("strike1").style.visibility = "visible";
        }
        if (strikes >= 2) {
            document.getElementById("strike2").style.visibility = "visible";
        }
        if (strikes >= 3) {
            document.getElementById("strike3").style.visibility = "visible";
            console.log("Game over");
            gamezone.innerHTML = `<strong>You struck out!! <br> Your game ends here!! </strong> Your score is ${bank} points. <br> Reset and try again!`;
        }
    });

// BANKING POINTS
    const stopBox = document.querySelector("stop")
    stopBox.addEventListener("click", () => {
        bank += score;
        score = 0;
        scoreInfoSpace.innerHTML = `You banked your winnings. Current score: ${score}, Bank: ${bank}`;
        
    });
}
/*              things to debug
1. disable start button, if game has started
2. if player strikes out, then disable start button or convert start button to reset button. disable is probably better, since I already want to do that?
3. 

            Other game functions to add. 
1. End the game after 3 banks (call it attempts?). create a space to show how many left?
2. store high score as local data
3. Maybe convert strikes to threats, and have multiple threat types
spiders, snakes and scorpions? (then re-theme game as treasure hunter, point=> gold)
4. make visible, temporary picture when player gains points (finds treasure) with point values on it
5. treasure pic should slowly fade away
6. add a midi soundtrack on game start (or webpage load) */
