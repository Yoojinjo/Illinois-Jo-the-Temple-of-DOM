/* made some buttons. clicking on directions will modify the text area to explain the game. clicking on the start button will hide the buttons and begin the game loop. 
features needed. a score tracker, a life counter that updates.
game loop?
game over condition */

const directionButton = document.getElementById("directions")
const startButton = document.getElementById("start")
const textArea = document.getElementById("text")
const gamezone = document.getElementById("gamezone")
const menu = document.getElementById("menu")
let score = 10

directionButton.addEventListener("click", ()=>{textArea.innerHTML ="testcode"})

startButton.addEventListener("click", ()=>{textArea.innerHTML =`Your score: ${score}`;
makeLoop()
score-- 
})
function makeLoop () {
const makeLootBox = document.createElement("lootBox")
makeLootBox.innerText = "Loot Box";
gamezone.appendChild(makeLootBox); }

// function scoreCounter =