/*****************************
 * IMPORTS
 ****************************/
import {
   classicMode,
   removeSelected,
   match
} from './utils.js';
import * as DC from './domConst.js'

/**********************************
 * Game Variables
 *********************************/
let userScore = 0;
let opponentScore = 0;
let result = "";
let resultMessage = "";
let compChoices = 5;
let selection = "Potato";
DC.userLabel_div.innerHTML = sessionStorage.getItem("name");

/**************************************
 * Event Listeners
 *************************************/
DC.switch2_input.addEventListener('change', () => {
   classicMode();
   if (DC.switch2_input.checked) {
      compChoices = 3;
   } else {
      compChoices = 5;
   }
});

DC.startBtn.addEventListener('click', () => {
   DC.scoreBoard_div.classList.remove('hidden');
   document.getElementById('actionPrompt').classList.remove('hidden');
   document.querySelectorAll('.startScreen')[0].classList.add('hidden');
   gameLoop();
});

DC.playBtn.addEventListener('click', gameLoop);


function compGame() {
   DC.gameBoard_div.classList.remove("hidden");
   DC.gameResult_div.classList.add("hidden");
   removeSelected();

   // reset the game board
   result = "";
   resultMessage = "";
   selection = "Potato";

   // Add all the selection event listeners
   DC.rock_div.addEventListener('click', () => {
      removeSelected();
      DC.rock_div.classList.add('selected');
      selection = "Rock";
   });

   DC.paper_div.addEventListener('click', () => {
      removeSelected();
      DC.paper_div.classList.add('selected');
      selection = "Paper";
   });

   DC.scissors_div.addEventListener('click', () => {
      removeSelected();
      DC.scissors_div.classList.add('selected');
      selection = "Scissors";
   });

   DC.lizard_div.addEventListener('click', () => {
      removeSelected();
      DC.lizard_div.classList.add('selected');
      selection = "Lizard";
   });

   DC.spock_div.addEventListener('click', () => {
      removeSelected();
      DC.spock_div.classList.add('selected');
      selection = "Spock";
   });
}

function getComputerChoice() {
   const choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
   const randomNum = Math.floor(Math.random() * compChoices);
   return choices[randomNum];
}

function gameLoop() {
   compGame();
   DC.timeMessage_p.innerHTML = "Rock"
   setTimeout(() => {
      DC.timeMessage_p.innerHTML = "Paper";
   }, 800);
   setTimeout(() => {
      DC.timeMessage_p.innerHTML = "Scissors";
   }, 1600);
   setTimeout(() => {
      DC.timeMessage_p.innerHTML = "Shoot!";
   }, 2400)
   setTimeout(() => {
      let compChoice = getComputerChoice();
      const outcome = match(selection, compChoice);
      DC.result_p.innerHTML = outcome.message;
      if (outcome.result === 1) {
         userScore++;
      } else if (outcome.result === 2) {
         opponentScore++;
      }
      DC.gameBoard_div.classList.add("hidden");
      DC.userScore_span.innerHTML = userScore;
      DC.opponentScore_span.innerHTML = opponentScore;
      DC.gameResult_div.classList.remove("hidden");
   }, 3500);
}
