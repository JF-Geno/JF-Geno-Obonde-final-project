// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
let arr = [
  "fas fa-atom",
  "fas fa-frog",
  "fas fa-feather-alt",
  "fas fa-cogs",
  "fas fa-anchor",
  "fas fa-fan",
  "fas fa-bolt",
  "fas fa-hat-wizard",
  "fas fa-apple-alt",
  "fas fa-bell",
  "fas fa-bomb",
  "fas fa-brain",
];

let NextSetArr = [
  "fas fa-atom",
  "fas fa-frog",
  "fas fa-feather-alt",
  "fas fa-cogs",
  "fas fa-anchor",
  "fas fa-fan",
  "fas fa-bolt",
  "fas fa-hat-wizard",
  "fas fa-apple-alt",
  "fas fa-bell",
  "fas fa-bomb",
  "fas fa-brain",
];

let gameState = {
  yourScore: 0,
  startScore: 0,
  matchFound: 0,
};

function addPoints() {
  var score = document.getElementById("score");
  gameState.yourScore += 1;
  score.textContent = gameState.yourScore;
}

function randomSymbols() {
  const CardsNode = document.querySelectorAll(".card");
  for (let i = 0; i < 12; i++) {
    let cardSymbol = CardsNode[i].firstElementChild;
    cardSymbol.className = arr[i];
  }
}

//Users should not be able to open a card that is already *open* or *matched*.
function nextRandomSymbols() {
  let nextCardName = document.getElementById("next-card");
  let nextCardSymbol = nextCardName.firstChild;

  let match = gameState.matchFound;
  for (let x = 0; x < match; x++) {
    if (!nextCardSymbol.className.match(NextSetArr[x])) {
      nextCardSymbol.className = NextSetArr[x];
      // console.log((nextCardSymbol.className = NextSetArr[x]));
    }
  }
}

function restartGame() {
  score.textContent = gameState.startScore;
  gameState.yourScore = gameState.startScore;

  const matchedCards = document.querySelectorAll(".card.matched");
  const showCards = document.querySelectorAll(".card.show");

  for (let i = 0; i < matchedCards.length; i++) {
    matchedCards[i].classList.remove("matched");
  }

  for (let x = 0; x < showCards.length; x++) {
    showCards[x].classList.remove("show");
  }

  gameState.matchFound = 0;

  shuffle(arr);
  randomSymbols();
}

function render(event) {
  let nextCard = document.getElementById("next-card").firstChild.className;
  let clickedCard = event.target;
  let callForCardClassName = event.target.className;
  let cardName = clickedCard.firstElementChild.className;
  let youWin = gameState.matchFound;
  if (nextCard.match(cardName) && callForCardClassName.match("card")) {
    clickedCard.classList = "card matched";
    gameState.matchFound += 1;
    if (youWin == 12) {
      gameWin();
    }
    nextRandomSymbols();
  } else if (callForCardClassName.match("card")) {
    event.target.className = "card show";
    addPoints();
    setTimeout(closeShow, 1000);
  }
}

function closeShow() {
  let clickedCard = document.querySelectorAll(".card.show");
  for (let i = 0; i < 12; i++) {
    let clicked = clickedCard[i];
    clicked.className = "card";
  }
}

function gameWin() {
  let score = gameState.yourScore;
  alert("You Win Great job and Your Score is", score);
}

restartGame();

document.querySelector(".restart").addEventListener("click", restartGame);

document.addEventListener("click", render);

//Users should not be able to reveal more than 1 card at a time.
//If several cards are clicked in succession, only the first click should register and reveal a card.
