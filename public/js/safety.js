/**********************************
 *  - The Rules -
 * Paper covers rock
 * rock crushes scissors
 * scissors cuts paper
 * rock crushes lizard
 * lizard poisons Spock
 * Spock smashes Scissors
 * scissors decapitates lizard
 * lizard eats paper
 * paper disproves Spock
 * Spock vaporizes rock
 **********************************/

let userScore = 0;
let opponentScore = 0;

const userScore_span = document.querySelector('#userScore');
const opponentScore_span = document.querySelector('#opponentScore');
const scoreBoard_div = document.querySelector('.scoreBoard');
const result_p = document.querySelector('.result > p');
const rock_div = document.querySelector('#rock');
const paper_div = document.querySelector('#paper');
const scissors_div = document.querySelector('#scissors');
const lizard_div = document.querySelector('#lizard');
const spock_div = document.querySelector('#spock');

function compGame() {
   rock_div.addEventListener('click', () => {
      //console.log("Hey did someone click Rock?");
      match("Rock", getComputerChoice());
   });

   paper_div.addEventListener('click', () => {
      //console.log("Do I have to write another Paper");
      match("Paper", getComputerChoice());
   });

   scissors_div.addEventListener('click', () => {
      //console.log("Cut Cut");
      match("Scissors", getComputerChoice());
   });

   lizard_div.addEventListener('click', () => {
      //console.log("Don't poke the Lizard?");
      match("Lizard", getComputerChoice())
   });

   spock_div.addEventListener('click', () => {
      //console.log("Live Long and Prosper!");
      match("Spock", getComputerChoice())
   });
}

function getComputerChoice() {
   const choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
   const randomNum = Math.floor(Math.random() * 5);
   return choices[randomNum];
}

function win(user, opponent) {
   //console.log("User Wins!");
   userScore ++;
   userScore_span.innerHTML = userScore;
   opponentScore_span.innerHTML = opponentScore;
   result_p.innerHTML = `${user} beats ${opponent}. You WIN!`;
}

function lose(user, opponent) {
   //console.log(`User Loses :( ${user.toLowerCase()}`);
   opponentScore ++;
   opponentScore_span.innerHTML = opponentScore;
   userScore_span.innerHTML = userScore;
   result_p.innerHTML = `${opponent} beats ${user}. You Lose :(`;
}

function draw(user, opponent) {
   //console.log("Its a draw");
   result_p.innerHTML = `${user} = ${opponent}. It's a draw`;
}

function match(userChoice, opponentChoice) {
   //const computerChoice = getComputerChoice();
   //console.log(`User picked ${userChoice}`);
   //console.log(`Comp picked ${computerChoice}`);
   switch (userChoice + ' ' + opponentChoice) {
      case 'Rock Scissors':
      case 'Rock Lizard':
      case 'Paper Rock':
      case 'Paper Spock':
      case 'Scissors Paper':
      case 'Scissors Lizard':
      case 'Lizard Spock':
      case 'Lizard Paper':
      case 'Spock Rock':
      case 'Spock Scissors':
         win(userChoice, opponentChoice);
         break;
      case 'Scissors Rock':
      case 'Lizard Rock':
      case 'Rock Paper':
      case 'Spock Paper':
      case 'Paper Scissors':
      case 'Lizard Scissors':
      case 'Spock Lizard':
      case 'Paper Lizard':
      case 'Rock Spock':
      case 'Scissors Spock':
         lose(userChoice, opponentChoice);
         break;
      case 'Rock Rock':
      case 'Paper Paper':
      case 'Scissors Scissors':
      case 'Lizard Lizard':
      case 'Spock Spock':
         draw(userChoice, opponentChoice);
         break;
   }
}

compGame();
//console.log(getComputerChoice());