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
let trips = 3;

let scorpion = 0;
let snake = 0;
let spider = 0;

//      disable start button after the game is started
function disableStart() {
    startButton.addEventListener("click", () => {
        startButton.disabled = true;
    });
}

disableStart();

//          Game rules and directions
directionButton.addEventListener("click", () => {
    extraInfoSpace.innerText =
        "Each box you open adds a random number of points. If you get 3 strikes, you lose all your points. Decide when to stop and bank your points!";
});

//          Creating the game environment
startButton.addEventListener("click", () => {
    makeGoStop();
    const tripsRemain = document.createElement("tripsRemain");
    tripsRemain.innerHTML = `Expeditions remaining: ${trips}`;
    scoreInfoSpace.appendChild(tripsRemain);

    const currentGold = document.createElement("currentGold");
    currentGold.innerHTML = `Current Gold: ${score}`;
    scoreInfoSpace.appendChild(currentGold);

    const bankGold = document.createElement("bankGold");
    bankGold.innerHTML = `Banked Gold: ${bank}`;
    scoreInfoSpace.appendChild(bankGold);
});

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
    // scoreUpdate()
}
//          Main game loop Search/Score/Penalties
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

    // stop colorchange if Go not clicked
    goBox.addEventListener("mouseout", mouseOut);
    function mouseOut() {
        clearInterval(colorInterval);
        goBox.style.background = "green";
    }
    //          SCORING
    // onclick of loot box, the score will change by a random amount
    goBox.addEventListener("click", () => {
        lootResult = Math.floor(Math.random() * 10);
        score += lootResult;
        extraInfoSpace.innerHTML = `You found ${lootResult} more gold!`;

        scoreUpdate();
        // scoreInfoSpace.innerHTML = `You got ${lootResult} points. <br> Temporary Score: ${score}, Bank: ${bank}`;

        const clickedbox = document.querySelector("go");
        // add strikes for red and orange
        if (clickedbox.style.background == "red") {
            console.log("2 strikes");
            monster();
            monster();
        }
        if (clickedbox.style.background == "orange") {
            console.log("1 strikes");
            monster();
        }

        // strike counter
        monsterAppears();
    });

    //          Reset button
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
        enableStart();
    });

    // BANKING POINTS
    const stopBox = document.querySelector("stop");
    stopBox.addEventListener("click", () => {
        bank += score;
        score = 0;
        trips--;
        extraInfoSpace.innerHTML = `You banked your winnings. <br> You have ${trips} expeditions left`;
        scoreUpdate();
    });
}

function enableStart() {
    resetButton.addEventListener("click", () => {
        startButton.disabled = false;
    });
}

function scoreUpdate() {
    const tripsRemain = document.querySelector("tripsRemain");
    tripsRemain.innerHTML = `Expeditions remaining: ${trips}`;

    const currentGold = document.querySelector("currentGold");
    currentGold.innerHTML = `Current Gold: ${score}`;

    const bankGold = document.querySelector("bankGold");
    bankGold.innerHTML = `Banked Gold: ${bank}`;
}

function monster() {
    let monsterRoll = Math.floor(Math.random() * 3);
    if (monsterRoll == 0) {
        scorpion++;
        extraInfoSpace.innerHTML += `<br> You got stung by a scorpion!`;
    } else if (monsterRoll == 1) {
        snake++;
        extraInfoSpace.innerHTML += `<br> Snakes! Why does it have to be snakes!!!`;
    } else {
        spider++;
        extraInfoSpace.innerHTML += `<br> You got bit by a spider!`;
    }
}

function monsterAppears() {
    const jungleCreatures = [scorpion, snake, spider];
    const jungleCreaturesString = ["scorpion", "snake", "spider"];
    let monsterId = ""
    for (let i = 0; i < jungleCreatures.length; i++) {
        if (jungleCreatures[i] > 0) {
            monsterId = `${jungleCreaturesString[i]}1`;
            document.getElementById(monsterId).style.visibility = "visible";
        }
        if (jungleCreatures[i] > 1) {
            monsterId = `${jungleCreaturesString[i]}2`;
            document.getElementById(monsterId).style.visibility =
                "visible";
        }
        if (jungleCreatures[i] > 2) {
            monsterId = `${jungleCreaturesString[i]}3`;
            document.getElementById(monsterId).style.visibility =
                "visible";
        }
    }
}
/*              things to debug
1. XXXX disable start button, if game has started
2. XXXX if player strikes out, then disable start button or convert start button to reset button. disable is probably better, since I already want to do that? - not needed anymore
3. XXXX reset button must enable start button

            Other game functions to add. 
1. End the game after 3 banks (call it attempts?). create a space to show how many left?
2. store high score as local data
3. XXXXX Maybe convert strikes to threats, and have multiple threat types spiders, snakes and scorpions? (then re-theme game as treasure hunter, point=> gold)
4. make visible, temporary picture when player gains points (finds treasure) with point values on it
5. treasure pic should slowly fade away
6. add a midi soundtrack on game start (or webpage load) */
