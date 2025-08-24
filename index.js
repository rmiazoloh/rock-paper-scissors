// Game Logic
const WINNING_SCORE = 5;
const CHOICES = {
  ROCK: 'Rock',
  PAPER: 'Paper',
  SCISSORS: 'Scissors'
};

let gameState = {
  humanScore: 0,
  computerScore: 0,
  round: 0,
  isGameEnded: false
};

// DOM Elements
const elements = {
  choices: document.querySelector('.choices'),
  roundText: document.querySelector('.round'),
  humanScoreText: document.querySelector('#human-score'),
  computerScoreText: document.querySelector('#computer-score'),
  roundResult: document.querySelector('.round-results'),
  finalResultText: document.querySelector('.final-result')
};

// Initialize score display
function initializeGame() {
  elements.humanScoreText.textContent = gameState.humanScore;
  elements.computerScoreText.textContent = gameState.computerScore;
  setupEventListeners();
}

function setupEventListeners() {
  elements.choices.addEventListener('click', handlePlayerChoice);
}

function handlePlayerChoice(event) {
  // Prevent further plays if game is already over
  if (gameState.isGameEnded) {
    displayGameResults();
    return;
  }
  
  const humanChoice = event.target.id;
  
  if (!isValidChoice(humanChoice)) {
    console.log('Invalid choice. Please click on Rock, Paper, or Scissors button.');
    return;
  }
  
  const computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);
  updateRoundCounter();
  
  // Check if game is over after this round
  if (isGameOver()) {
    gameState.isGameEnded = true;
    displayGameResults();
    disableGameChoices();
  }
}

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  const choices = [CHOICES.ROCK, CHOICES.PAPER, CHOICES.SCISSORS];
  return choices[randomNumber];
}

function isValidChoice(choice) {
  return Object.values(CHOICES).includes(choice);
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    displayRoundResult('Tie for the round');
    return;
  }
  
  if (isPlayerWinningCombination(humanChoice, computerChoice)) {
    incrementHumanScore();
    displayRoundResult('You win the round!');
  } else {
    incrementComputerScore();
    displayRoundResult('Computer wins the round!');
  }
}

function isPlayerWinningCombination(humanChoice, computerChoice) {
  return (humanChoice === CHOICES.ROCK && computerChoice === CHOICES.SCISSORS) ||
         (humanChoice === CHOICES.PAPER && computerChoice === CHOICES.ROCK) ||
         (humanChoice === CHOICES.SCISSORS && computerChoice === CHOICES.PAPER);
}

function incrementHumanScore() {
  gameState.humanScore++;
  elements.humanScoreText.textContent = gameState.humanScore;
}

function incrementComputerScore() {
  gameState.computerScore++;
  elements.computerScoreText.textContent = gameState.computerScore;
}

function displayRoundResult(message) {
  elements.roundResult.textContent = message;
}

function updateRoundCounter() {
  gameState.round++;
  elements.roundText.textContent = gameState.round;
}

function isGameOver() {
  return gameState.humanScore === WINNING_SCORE || gameState.computerScore === WINNING_SCORE;
}

function disableGameChoices() {
  // Visual indication that game is over
  elements.choices.classList.add('game-ended');
  // Optional: Add some visual feedback to show game is over
  elements.roundResult.classList.add('game-over');
}

function displayGameResults() {
  const { humanScore, computerScore } = gameState;
  let resultMessage;
  
  if (humanScore === computerScore) {
    resultMessage = "It's a tie!";
  } else if (humanScore > computerScore) {
    resultMessage = "You win the game!";
  } else {
    resultMessage = "Computer wins the game!";
  }
  
  elements.finalResultText.textContent = resultMessage;
  console.log(resultMessage);
  console.log(`Your score: ${humanScore}, Computer score: ${computerScore}`);
}

// Initialize the game
initializeGame();