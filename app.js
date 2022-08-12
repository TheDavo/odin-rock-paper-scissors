let numPlayerWin = 0;
let numComputerWin = 0;
let numTie = 0;
const gameTo = 5;
let gameHistory = [];
let cancelGame = false;

// This will allow us to use Math.random() to generate a computer input and refer it to a hand
const hands = ['rock', 'paper', 'scissors'];

const winConditions = {
  rock: {
    rock: 'tie',
    scissors: 'win',
    paper: 'lose',
  },
  paper: {
    rock: 'win',
    scissors: 'lose',
    paper: 'tie',
  },
  scissors: {
    rock: 'lose',
    scissors: 'tie',
    paper: 'win',
  },
};

// Connect JavaScript to the HTML elements

const playerWins = document.querySelector('#playerWins');
const compWins = document.querySelector('#compWins');
const gameTies = document.querySelector('#gameTies');
const winner = document.querySelector('#winner');

function getComputerInput() {
  return hands[Math.floor(Math.random() * 3)];
}

// From button onClick method will call playRound('rock')
// The game progresses with each human input, therefore this function call pushes the game forward by one round
function playRound(playerInput) {
  if (!isGameOver()) {
    const compInput = getComputerInput();
    const roundStatus = determineWin(playerInput, compInput);
    updateWinLoss(roundStatus);

    gameHistory.push({
      Ties: numTie,
      playerWins: numPlayerWin,
      computerWins: numComputerWin,
      playerInput: playerInput,
      computerInput: compInput,
    });

    playerWins.innerText = numPlayerWin;
    compWins.innerText = numComputerWin;
    gameTies.innerText = numTie;

    consoleTableGame(playerInput, compInput);

    if (isGameOver()) {
      declareWinner();
    }
  }
}

function declareWinner() {
  if (determinePlayerWin()) {
    console.log('You won!');
    winner.innerText = 'You won!';
  } else {
    console.log('Computer won! :(');
    winner.innerText = 'The computer won! O:';
  }
}

function isGameOver() {
  return numComputerWin == gameTo || numPlayerWin == gameTo;
}

function updateWinLoss(status) {
  switch (status) {
    case 0:
      numTie++;
      break;
    case 1:
      numPlayerWin++;
      break;
    case 2:
      numComputerWin++;
      break;
  }
}

function determinePlayerWin() {
  return numPlayerWin > numComputerWin;
}

function resetGame() {
  numPlayerWin = 0;
  numComputerWin = 0;
  numTie = 0;
  gameHistory = [];
  cancelGame = false;

  playerWins.innerText = numPlayerWin;
  compWins.innerText = numComputerWin;
  gameTies.innerText = numTie;
  winner.innerText = 'Winner undecided...';
}

// Return a 0 for tie, 1 for human win, and 2 for computer win
function determineWin(playerHand, computerHand) {
  switch (winConditions[playerHand][computerHand]) {
    case 'tie':
      return 0;
    case 'win':
      return 1;
    case 'lose':
      return 2;
  }
}

function consoleTableGame(playerInput, compInput) {
  console.clear();
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(
    `Inputs:\nPlayer input: ${playerInput}\nComputer input: ${compInput}`
  );
  console.log(`Game number ${numComputerWin + numTie + numPlayerWin}`);
  console.table(gameHistory);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
}
