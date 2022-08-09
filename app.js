let numHumanWin = 0;
let numComputerWin = 0;
let numTie = 0;
let humanHand;
let computerHand;
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

function getComputerInput() {
  return hands[Math.floor(Math.random() * 3)];
}

function getHumanInput() {
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

// Return a 0 for tie, 1 for human win, and 2 for computer win
function determineWin(humanHand, computerHand) {
  switch (winConditions[humanHand][computerHand]) {
    case 'tie':
      return 0;
    case 'win':
      return 1;
    case 'lose':
      return 2;
  }
}

function playRockPaperScissors(numGames) {
  /* Reset variable every game */
  numHumanWin = 0;
  numComputerWin = 0;
  numTie = 0;
  gameHistory = [];
  cancelGame = false;
  let validInput = false;
  let winner = 0;

  while (numHumanWin + numComputerWin != numGames && !cancelGame) {
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
          numHumanWin++;
          break;
        case 2:
          numComputerWin++;
          break;
      }
      gameHistory.push({
        Ties: numTie,
        Wins: numHumanWin,
        Losses: numComputerWin,
      });
      console.clear();
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log(
        `Inputs:\nHuman input: ${humanHand}\nComputer input: ${computerHand}`
      );
      console.log(`Game number ${numComputerWin + numTie + numHumanWin}`);
      console.table(gameHistory);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    } else {
      console.log('Game canceled!');
    }
  }
}
