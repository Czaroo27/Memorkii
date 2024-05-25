const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
const deck = [...cardValues, ...cardValues];
deck.sort(() => Math.random() - 0.5);

const cardElements = document.createElement("div");
cardElements.classList.add("card-elements");
cardElements.dataset.value = value;
cardElement.addEventListener("click", flipCard);
document.getElementById("gameBoard");
