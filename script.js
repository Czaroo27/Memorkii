const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restartButton");
const cardValues = [
  "assets/memor1.jpeg",
  "assets/memor1.jpeg",
  "assets/memor2.png",
  "assets/memor2.png",
  "assets/memor3.jpg",
  "assets/memor3.jpg",
  "assets/memor4.jpeg",
  "assets/memor4.jpeg",
  "assets/memor5.jpeg",
  "assets/memor5.jpeg",
  "assets/memor6.webp",
  "assets/memor6.webp",
  "assets/memor7.jpeg",
  "assets/memor7.jpeg",
  "assets/memor8.png",
  "assets/memor8.png",
];

let flippedCards = [];
let matchedPairs = 0;

function initializeGame() {
  cardValues.sort(() => 0.5 - Math.random());
  gameBoard.innerHTML = "";

  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;

    const frontFace = document.createElement("div");
    frontFace.classList.add("front");
    card.appendChild(frontFace);

    const backFace = document.createElement("div");
    backFace.classList.add("back");
    backFace.style.backgroundImage = `url(${value})`;
    card.appendChild(backFace);

    gameBoard.appendChild(card);
  });

  flippedCards = [];
  matchedPairs = 0;

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });
}

function handleCardClick(e) {
  const card = e.currentTarget;
  if (card.classList.contains("flipped") || card.classList.contains("matched"))
    return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
      flippedCards.forEach((card) => card.classList.add("matched"));
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === cardValues.length / 2) {
        setTimeout(() => alert("Wygrałeś!"), 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach((card) => card.classList.remove("flipped"));
        flippedCards = [];
      }, 1000);
    }
  }
}

function restartGame() {
  initializeGame();
}

restartButton.addEventListener("click", restartGame);

initializeGame();
