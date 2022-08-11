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

    consoleTableGame(playerInput, compInput);

    if (isGameOver()) {
      declareWinner();
    }
  }
}

function declareWinner() {
  if (determinePlayerWin()) {
    console.log('You won!');
  } else {
    console.log('Computer won! :(');
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
}

/* Console based human input, requiring validators

function getplayerInput() {
  let answer = prompt(
    'Please enter an input\nRock, Paper, or Scissors',
    'rock'
  );
  // Sanitize the input
  if (answer != null) {
    answer = cleanHumanInput(answer);
  } else {
    answer = '';
    cancelGame = true;
  }
  return answer;
}

function cleanHumanInput(input) {
  input = input.toLowerCase();
  input = input.trim();
  return input;
}

function isValidInput(input) {
  const inArray = hands.indexOf(input);
  if (inArray == -1) {
    return false;
  }
  return true;
}

*/

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
/* Console version of game

function playRockPaperScissors(numGames) {
  // Reset variable every game 
  numPlayerWin = 0;
  numComputerWin = 0;
  numTie = 0;
  gameHistory = [];
  cancelGame = false;
  let validInput = false;
  let winner = 0;

  while (numPlayerWin + numComputerWin != numGames && !cancelGame) {
    computerHand = getComputerInput();

    do {
      humanHand = getHumanInput();
      validInput = isValidInput(humanHand);
    } while (!validInput && !cancelGame);
    if (!cancelGame) {
      winner = determineWin(humanHand, computerHand);
      switch (winner) {
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
      gameHistory.push({
        Ties: numTie,
        Wins: numPlayerWin,
        Losses: numComputerWin,
      });
      console.clear();
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log(
        `Inputs:\nHuman input: ${humanHand}\nComputer input: ${computerHand}`
      );
      console.log(`Game number ${numComputerWin + numTie + numPlayerWin}`);
      console.table(gameHistory);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    } else {
      console.log('Game canceled!');
    }
  }
}
*/
