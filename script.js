const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restartButton");

const images = [
  "img.png",
  "img.png",
  "img.png",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
  "img7.jpg",
  "img8.jpg",
];
let cards = [...images, ...images]; // Duplicate the images to create pairs
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(cards);
  gameBoard.innerHTML = "";
  cards.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;

    const frontFace = document.createElement("img");
    frontFace.src = image;
    frontFace.classList.add("front");

    const backFace = document.createElement("div");
    backFace.classList.add("back");
    backFace.innerText = "?";

    card.appendChild(frontFace);
    card.appendChild(backFace);
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

restartButton.addEventListener("click", createBoard);

createBoard();
