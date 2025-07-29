
// Gets the user's choice in a Rock, Paper, Scissors game.
function getHumanChoice() {
    let humanChoice = prompt('Please enter your choice: Rock, Paper, or Scissors');
    humanChoice = humanChoice.toLowerCase();
    if (humanChoice !== 'rock' && humanChoice !== 'paper' && humanChoice !== 'scissors') {
        console.log('Invalid choice. Please enter Rock, Paper, or Scissors.');
        return null;
    } else {
        return humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);
    }
}
// Generates a random choice for the computer in a Rock, Paper, Scissors game.
// 0 for Rock, 1 for Paper, 2 for Scissors
function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return 'Rock';

    }else if (randomNumber === 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }

}

/** AI Solution 
 * Alternative implementation using an array:
function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
    
}
*/

function playRound(humanChoice, computerChoice) {
    if (humanChoice === null) {
        console.log('Game cancelled du to invalid input.');
        return null;
    }
    console.log(`You chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    if (humanChoice === computerChoice) {
        console.log('Tie for the round');
        return null
    }
    if ((humanChoice === 'Rock' && computerChoice === 'Scissors') ||
        (humanChoice === 'Paper' && computerChoice === 'Rock') ||
        (humanChoice === 'Scissors' && computerChoice === 'Paper')) {
        humanScore++;
        console.log('You win the round!');
    }else {
        computerScore++;
        console.log('Computer win the round!');
    }
}


function playGame(){
    for (let i = 0; i < 5; i++){
        const computerChoice = getComputerChoice();
        const humanChoice = getHumanChoice();
        console.log(`Tour n° : ${i+1}`);
        playRound(humanChoice, computerChoice);
        console.log(`Your score: ${humanScore}, Computer score: ${computerScore}`);
        console.log('\n');
    }
    if (humanScore === computerScore){
        console.log('It\'s a tie!');
        console.log(`Your score: ${humanScore}, Computer score: ${computerScore}`);
    } else if (humanScore > computerScore){
        console.log('You win the game!');
        console.log(`Your score: ${humanScore}, Computer score: ${computerScore}`);
    }else {
        console.log('Computer win the game!');
        console.log(`Your score: ${humanScore}, Computer score: ${computerScore}`);
    }

}

let humanScore = 0;
let computerScore = 0;
playGame();





