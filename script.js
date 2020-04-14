const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let correctMatches = 0;
let attempts = 0;
const correctMatchesElement = document.querySelector(".matches");
const totalAttemptsElement = document.querySelector(".attempts");
const restartButton = document.querySelector(".restart");
cards.forEach((cards) => cards.addEventListener("click", flipCard));

function flipCard() {
  //if lockboard is true while the unflip method is executing we cant flip any more cards
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");
  this.classList.add("hasFlipped");

  if (!hasFlippedCard) {
    //first Click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //second click
  updateAttempts();
  secondCard = this;
  checkForMatch();
  // do cards match
}

function checkForMatch() {
  let isMatch = firstCard.dataset.gadget === secondCard.dataset.gadget;

  if (isMatch) {
    disableCards();
    updateMatches();
  } else {
    unflipCards();
  }

  // isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.setAttribute("flipped", "true");
  secondCard.setAttribute("flipped", "true");
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  resetScores();
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function updateMatches() {
  correctMatches += 1;
  correctMatchesElement.innerText = `${correctMatches}`;
}

function updateAttempts() {
  attempts += 1;
  totalAttemptsElement.innerText = `${attempts}`;
}

restartButton.addEventListener("click", restart);

function resetScores() {
  correctMatches = 0;
  attempts = 0;
  totalAttemptsElement.innerText = `${attempts}`;
  correctMatchesElement.innerText = `${correctMatches}`;
}

function restart() {
  resetScores();
  showSolution();
  location.reload();
}

function showSolution() {
  cards.forEach((card) => {
    if (card.classList != "flip") {
      card.classList.add("flip");
    }
  });
}
