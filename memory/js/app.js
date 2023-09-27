// Array of cards
let cardsArray = ['fa fa-diamond', 'fa fa-paper-plane-o',
                  'fa fa-anchor','fa fa-bolt',
                  'fa fa-cube', 'fa fa-leaf',
                  'fa fa-bicycle', 'fa fa-bomb',
                  'fa fa-diamond', 'fa fa-paper-plane-o',
                  'fa fa-anchor', 'fa fa-bolt',
                  'fa fa-cube', 'fa fa-leaf',
                  'fa fa-bicycle', 'fa fa-bomb']

// Array of stars
let starsArray = ['fa fa-star', 'fa fa-star', 'fa fa-star']

// Define variables
const stars = document.querySelector('.stars');
const time = document.querySelector('.time');
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const content = document.querySelector('.modal-content');
const modalStars = document.querySelector('.modal-stars');

// Array to temporarily store clicked cards in order to compare
let tempArray = [];

// Array to store matched cards
let matchedArray = [];

// Adds stars
function addStar() {
  for (let i=0; i<starsArray.length; i++) {
    let li = document.createElement('li');
    li.className = 'star';
    let icon = document.createElement('i');
    icon.className = starsArray[i];
    li.appendChild(icon);
    stars.appendChild(li);
  }
}

// Initially sets values to 0
let myTimer = 0;
let seconds = 0;
let cardClicks = 0;
let move = 0;

// Controls the timer
function timer(bool) {
  if (bool) {
    let myTimer = setInterval(function() {
      if (cardClicks >= 1 || move >= 1) {
        seconds++;
        time.innerHTML = seconds;
      }
    }, 1000);
  } else {
    clearInterval(myTimer);
    myTimer = 0;
    seconds = 0;
    time.innerHTML = seconds;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Shuffles and deals cards
function dealCards() {
  let cards = shuffle(cardsArray);
  for (let i=0; i<cardsArray.length; i++) {
    let li = document.createElement('li');
    li.className = 'card';
    let icon = document.createElement('i');
    icon.className = cards[i];
    li.appendChild(icon);
    deck.appendChild(li);
  }
}

// Adds event listeners and manages card clicks
function clickCard() {
  deck.addEventListener('click', function(event) {
    if (event.target.classList.contains('card')) {
      cardClicks++;
      if (cardClicks === 1 || cardClicks === 2) {
        clickedCard();
      } else {
          resetTurn();
      }
    }
  })
}

// Reveals clicked cards, counts moves, deletes stars
function clickedCard() {
  if (event.target.classList.contains('card')) {
    event.target.classList.add('open', 'show', 'temp');
    tempArray.push(event.target);
    if (tempArray.length == 2) {
      if (tempArray[0] != tempArray[1]) {
        move++;
        moves.innerHTML = move;
        checkMatch();
        if (move === 15) {
          stars.children[2].classList.add('hide');
          starsArray.pop();
        } else if (move === 19) {
          stars.children[1].classList.add('hide');
          starsArray.pop();
        }
      } else {
          tempArray.splice(1);
      }
    }
  }
}

// Checks if cards are a match
function checkMatch() {
  let cardOne = tempArray[0].innerHTML;
  let cardTwo = tempArray[1].innerHTML;
  if (cardOne == cardTwo) {
    tempArray[0].classList.add('match');
    tempArray[0].classList.remove('temp');
    tempArray[1].classList.add('match');
    tempArray[1].classList.remove('temp');
    matchedArray.push(cardOne, cardTwo);
    tempArray = [];
    cardClicks = 0;
    if (matchedArray.length === 16) {
      endGame();
    }
  } else {
      let timeout;
      timeoutFunction();
  }
}

// Resets unmatched cards after a moment
function timeoutFunction() {
  timeout = setTimeout(function() {
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
    tempArray = [];
    cardClicks = 0;
  }, 1000);
}

// Resets unmatched cards after third card is clicked
function resetTurn() {
  try {
    clearTimeout(timeout);
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
  }
  catch(err) {
  }
  tempArray = [];
  tempArray.push(event.target);
  cardClicks = 1;
  clickedCard();
}

// Restarts game if repeat icon is clicked
function restartGame() {
  restart.addEventListener('click', function(event) {
    try {
      document.querySelector('.hide').classList.remove('hide');
      document.querySelector('.hide').classList.remove('hide');
      for (i=0; i<cardsArray.length; i++) {
        document.querySelector('.open').classList.remove('open', 'show', 'match', 'temp');
      }
    }
    catch(err) {
    }
    tempArray = [];
    matchedArray = [];
    cardClicks = 0;
    move = 0;
    moves.innerHTML = move;
    while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
    }
    timer(false);
    dealCards();
  })
}

//Show modal after game is won
function endGame() {
  content.innerHTML = "Brilliant! Completed in " + seconds + " seconds";
  cardClicks = 0;
  move = 0;
  timer(false);
  for (let i=0; i<starsArray.length; i++) {
    let li = document.createElement('li');
    li.className = 'startemp';
    let icon = document.createElement('i');
    icon.className = 'fa fa-star';
    li.appendChild(icon);
    modalStars.appendChild(li);
  }
  modal.style.display = "block";
  close.onclick = function() {
    modal.style.display = "none";
    restartGameWin();
  }
}

// Restart game after modal is clossed
function restartGameWin(){
  try {
    document.querySelector('.hide').classList.remove('hide');
    document.querySelector('.hide').classList.remove('hide');
    for (i=0; i<cardsArray.length; i++) {
      document.querySelector('.open').classList.remove('open', 'show', 'match', 'temp');
    }
  }
  catch(err) {
  }
  tempArray = [];
  matchedArray = [];
  cardClicks = 0;
  move = 0;
  moves.innerHTML = move;
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }
  try {
    const starTemp = document.querySelector('.startemp');
    modalStars.removeChild(starTemp);
    const starTempOne = document.querySelector('.startemp');
    modalStars.removeChild(starTempOne);
    const starTempTwo = document.querySelector('.startemp');
    modalStars.removeChild(starTempTwo);
  }
  catch(err) {
  }
  timer(false);
  dealCards();
}

// Initializes functions to start game
addStar();
timer(true);
dealCards();
clickCard();
restartGame();
