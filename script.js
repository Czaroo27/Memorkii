document.addEventListener("DOMContentLoaded", () => {
  const cardValues = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
  ];
  const gameBoard = document.getElementById("gameBoard");
  let flippedCards = [];
  let matchedPairs = 0;

  // Shuffle cards
  cardValues.sort(() => 0.5 - Math.random());

  // Create cards
  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.textContent = "?";
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });

  function handleCardClick(e) {
    const card = e.target;
    if (
      card.classList.contains("flipped") ||
      card.classList.contains("matched")
    )
      return;

    card.textContent = card.dataset.value;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        flippedCards.forEach((card) => card.classList.add("matched"));
        matchedPairs++;
        if (matchedPairs === cardValues.length / 2) {
          setTimeout(() => alert("Wygrałeś!"), 500);
        }
        flippedCards = [];
      } else {
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            card.textContent = "?";
          });
          flippedCards = [];
        }, 1000);
      }
    }
  }
});
