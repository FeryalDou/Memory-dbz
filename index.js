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
const resetButton = document.getElementById("reset");
const timerStart = startButton;
const secondsElement = document.getElementById("seconds");
let time = 59;
let intervalId = null;
let reset = resetButton;
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
        alert("Congratulations! You've completed the game ! Welcome to Namek");
      }
    }
  });
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  secondsElement.textContent = "2";
  //startTimer();

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
function startTimer() {
  time = 120;
  intervalId = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    console.log(minutes + ":" + seconds);
    console.log(minutes + ":" + seconds);
    secondsElement.textContent = minutes + ":" + seconds;
    time--;
    // console.log(time);
    // secondsElement.textContent = time;
    if (time === 0) {
      clearInterval(intervalId);
      alert("Game over !!! ");
    }
  }, 1000);
}

timerStart.addEventListener("click", startTimer);