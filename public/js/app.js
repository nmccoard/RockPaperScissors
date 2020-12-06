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
let result = "";
let resultMessage = "";
let compChoices = 5;

const startBtn = document.querySelector('#startGameBtn');
const userScore_span = document.querySelector('#userScore');
const opponentScore_span = document.querySelector('#opponentScore');
const scoreBoard_div = document.querySelector('.scoreBoard');
const result_p = document.querySelector('.result > p');
const timeMessage_p = document.querySelector('.timeMessage > p');
const gameBoard_div = document.querySelector('#gameBoard');
const gameResult_div = document.querySelector('#gameResults');
const rock_div = document.querySelector('#rock');
const paper_div = document.querySelector('#paper');
const scissors_div = document.querySelector('#scissors');
const lizard_div = document.querySelector('#lizard');
const spock_div = document.querySelector('#spock');
const playBtn = document.querySelector('#playAgainBtn');
const switch_input = document.querySelector('.switch > input');

startBtn.addEventListener('click', () => {
   scoreBoard_div.classList.remove('hidden');
   document.getElementById('actionPrompt').classList.remove('hidden');
   document.querySelectorAll('.startScreen')[0].classList.add('hidden');
   compGame();
   gameTime();
});

playBtn.addEventListener('click', () => {
   compGame();
   gameTime();
});

function compGame() {
   gameBoard_div.classList.remove("hidden");
   gameResult_div.classList.add("hidden");

   // reset the game board
   result = "";
   resultMessage = "";

   // Add all the selection event listeners
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
   const randomNum = Math.floor(Math.random() * compChoices);
   return choices[randomNum];
}

function match(userChoice, opponentChoice) {
   //const computerChoice = getComputerChoice();
   //console.log(`User picked ${userChoice}`);
   //console.log(`Comp picked ${computerChoice}`);
   switch (userChoice + ' ' + opponentChoice) {
      case 'Rock Scissors':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} crushes ${opponentChoice}.`;
         result = "win";
         break;
      case 'Rock Lizard':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} crushes ${opponentChoice}.`;
         result = "win";
         break;
      case 'Paper Rock':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} covers ${opponentChoice}.`;
         result = "win";
         break;
      case 'Paper Spock':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} disproves ${opponentChoice}.`;
         result = "win";
         break;
      case 'Scissors Paper':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} cuts ${opponentChoice}.`;
         result = "win";
         break;
      case 'Scissors Lizard':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} decapitates ${opponentChoice}.`;
         result = "win";
         break;
      case 'Lizard Spock':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} poisons ${opponentChoice}.`;
         result = "win";
         break;
      case 'Lizard Paper':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} eats ${opponentChoice}.`;
         result = "win";
         break;
      case 'Spock Rock':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} vaporizes ${opponentChoice}.`;
         result = "win";
         break;
      case 'Spock Scissors':
         console.log("User Wins!");
         resultMessage = `You WIN!<br>${userChoice} breaks ${opponentChoice}.`;
         result = "win";
         break;

      case 'Scissors Rock':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} smashes your ${userChoice}.`;
         result = "lose";
         break;
      case 'Lizard Rock':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} crushes your ${userChoice}.`;
         result = "lose";
         break;
      case 'Rock Paper':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} covers your ${userChoice}.`;
         result = "lose";
         break;
      case 'Spock Paper':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} disproves ${userChoice}.`;
         result = "lose";
         break;
      case 'Paper Scissors':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} shreds ${userChoice}.`;
         result = "lose";
         break;
      case 'Lizard Scissors':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} decapitates your ${userChoice}.`;
         result = "lose";
         break;
      case 'Spock Lizard':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} poisons ${userChoice}.`;
         result = "lose";
         break;
      case 'Paper Lizard':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>The ${opponentChoice} eats your ${userChoice}.`;
         result = "lose";
         break;
      case 'Rock Spock':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} vaporizes your ${userChoice}.`;
         result = "lose";
         break;
      case 'Scissors Spock':
         console.log(`User Loses :(`);
         resultMessage = `You Lose :(<br>${opponentChoice} breaks your ${userChoice}.`;
         result = "lose";
         break;

      case 'Rock Rock':
      case 'Paper Paper':
      case 'Scissors Scissors':
      case 'Lizard Lizard':
      case 'Spock Spock':
         console.log("Its a draw");
         resultMessage = `It's a draw<br>${userChoice} = ${opponentChoice}.`;
         result = "draw";
         break;
   }
}

function gameTime() {
   timeMessage_p.innerHTML = "Rock"
   setTimeout( () => {
      timeMessage_p.innerHTML = "Paper";
   }, 800);
   setTimeout( () => {
      timeMessage_p.innerHTML = "Scissors";
   }, 1600);
   setTimeout( () => {
      timeMessage_p.innerHTML = "Shoot!";
   }, 2400)
   setTimeout( () => {
      gameBoard_div.classList.add("hidden");
      result_p.innerHTML = resultMessage;
      if(result === "win"){
         userScore ++;
      } else if (result === "lose"){
         opponentScore ++;
      }
      userScore_span.innerHTML = userScore;
      opponentScore_span.innerHTML = opponentScore;
      gameResult_div.classList.remove("hidden");
   }, 3100);
}

switch_input.addEventListener('change', classicMode);

function classicMode() {
   if (switch_input.checked){
      document.querySelector('#classicTag').style.color = "#EFEFEF";
      document.querySelector('#epicTag').style.color = "#efefef2a";
      document.querySelector('#notClassic').classList.add("hidden");
      lizard_div.classList.add("hidden");
      spock_div.classList.add("hidden");
      compChoices = 3;
   } else {
      document.querySelector('#classicTag').style.color = "#efefef2a";
      document.querySelector('#epicTag').style.color = "#EFEFEF";
      document.querySelector('#notClassic').classList.remove("hidden");
      lizard_div.classList.remove("hidden");
      spock_div.classList.remove("hidden");
      compChoices = 5;
   }
}

//compGame();
//gameTime();
//console.log(getComputerChoice());