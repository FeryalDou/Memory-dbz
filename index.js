const cards = [
  { name: "bulma", image: "./image/bulma.png" },
  { name: "c-18", image: "./image/c-18.png" },
  { name: "cell", image: "./image/cell.png" },
  { name: "chichi", image: "./image/chichi.png" },
  { name: "krillin", image: "./image/krilin.png" },
  { name: "kame_sennin", image: "./image/kame_sennin.png" },
  { name: "shenron", image: "./image/shenron.png" },
  { name: "son_goku", image: "./image/son_goku.png" },
  { name: "trunks", image: "./image/trunks.png" },
  { name: "vegeta", image: "./image/vegeta.png" },
  { name: "yamcha", image: "./image/yamcha.png" },
  { name: "dragonball", image: "./image/dragonball.jpg" },
  { name: "bulma", image: "./image/bulma.png" },
  { name: "c-18", image: "./image/c-18.png" },
  { name: "cell", image: "./image/cell.png" },
  { name: "chichi", image: "./image/chichi.png" },
  { name: "krillin", image: "./image/krilin.png" },
  { name: "kame_sennin", image: "./image/kame_sennin.png" },
  { name: "shenron", image: "./image/shenron.png" },
  { name: "son_goku", image: "./image/son_goku.png" },
  { name: "trunks", image: "./image/trunks.png" },
  { name: "vegeta", image: "./image/vegeta.png" },
  { name: "yamcha", image: "./image/yamcha.png" },
  { name: "dragonball", image: "./image/dragonball.jpg" },
];

const customMemoryGame = new CustomMemoryGame(cards);
const timer = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("timerReset");
const timerStart = startButton;
const secondsElement = document.getElementById("seconds");
const soundCard = new Audio("./sounds/soundcard.mp3");
let time = 59;
let intervalId = null;
let reset = resetButton;
let isTimerRunning = false;
const win = document.getElementById("win");
const loose = document.getElementById("loose");
customMemoryGame.shuffleCards();

/*Create HTML Elements for Cards*/
let html = "";
customMemoryGame.cards.forEach((card) => {
  html += `<div class="card" data-card-name="${card.name}">
  <div class="back" name="${card.image}"></div>
  <div class="front" style="background: url(${card.image}) no-repeat"></div>
  </div>`;
});
document.querySelector("#game-board").innerHTML = html;
const allCards = document.querySelectorAll(".card");

allCards.forEach((card) => {
  card.addEventListener("click", () => {
    soundCard.play();
    card.classList.add("turned");
    customMemoryGame.pickedCards.push(card);

    if (customMemoryGame.pickedCards.length === 2) {
      if (
        customMemoryGame.checkIfPair(
          customMemoryGame.pickedCards[0].dataset.cardName,
          customMemoryGame.pickedCards[1].dataset.cardName
        )
      ) {
        customMemoryGame.pickedCards = [];
      } else {
        setTimeout(() => {
          customMemoryGame.pickedCards.forEach((card) => {
            card.classList.remove("turned");
          });
          customMemoryGame.pickedCards = [];
        }, 1000);
      }

      document.getElementById("pairs-guessed").innerHTML =
        customMemoryGame.pairsGuessed;
      document.getElementById("pairs-clicked").innerHTML =
        customMemoryGame.pairsClicked;

      if (customMemoryGame.checkIfFinished()) {
        win.show();
        //alert("Congratulations! You've completed the game ! Welcome to Namek");
        clearInterval(intervalId);
        isTimerRunning = false;
      }
    }
  });
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  secondsElement.textContent = "2:00";
  startButton.disabled = false;
  win.close();
  // startTimer();

  customMemoryGame.shuffleCards();
  allCards.forEach((card) => {
    card.classList.remove("turned");
  });
  customMemoryGame.pickedCards = [];
  customMemoryGame.pairsClicked = 0;
  customMemoryGame.pairsGuessed = 0;

  document.getElementById("pairs-guessed").innerHTML =
    customMemoryGame.pairsGuessed;
  document.getElementById("pairs-clicked").innerHTML =
    customMemoryGame.pairsClicked;
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  customMemoryGame.shuffleCards();
  allCards.forEach((card) => {
    card.classList.remove("turned");
  });
  win.close();
  loose.close();

  customMemoryGame.pickedCards = [];
  customMemoryGame.pairsClicked = 0;
  customMemoryGame.pairsGuessed = 0;

  document.getElementById("pairs-guessed").innerHTML =
    customMemoryGame.pairsGuessed;
  document.getElementById("pairs-clicked").innerHTML =
    customMemoryGame.pairsClicked;
});
function startTimer() {
  time = 120;
  intervalId = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    console.log(minutes + ":" + seconds);
    secondsElement.textContent = minutes + ":" + seconds;
    time--;
    // console.log(time);
    // secondsElement.textContent = time;
    if (time === 0) {
      //if (time === 0 && customMemoryGame.pairsGuessed !== cards.length / 2) {
      clearInterval(intervalId);
      //alert("Game over !!! ");
      loose.show();
    }
  }, 1000);
  isTimerRunning = true;
}

timerStart.addEventListener("click", startTimer);
