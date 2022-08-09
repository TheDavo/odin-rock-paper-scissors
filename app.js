let numHumanWin;
let numComputerWin;
let numGamesToPlay;

// This will allow us to use Math.random() to generate a computer input and refer it to a hand
const hands = ['rock', 'paper', 'scissors'];

function getComputerInput() {
  return hands[Math.floor(Math.random() * 2)];
}

function determineWin(humanHand, computerHand) {}
