/*****************************
* IMPORTS
****************************/
import { removeSelected, match } from './utils.js';

/****************************
 * Session variables
 ****************************/
let name = sessionStorage.getItem("name");
let mode = sessionStorage.getItem("mode");
let code = sessionStorage.getItem("code");

/****************************
 * Game Variables
 ****************************/
let playerNum = 0;
let userScore = 0;
let opponentScore = 0;
let resultMessage = "";

/*****************************
* SocketIO stuff
****************************/
let socket = io();

socket.on('init', handleInit);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('sendReady', handleReady);
socket.on('waitingOnPlayer', handleWaiting);
socket.on('startMatch', gameTime);
socket.on('matchEnded', matchEnded);
socket.on('gameOver', handleGameOver);

/******************************
 * Harvest the DOM elements
 *****************************/
const titleName1_span = document.getElementById("titleName1");
const titleName2_span = document.getElementById("titleName2");
const codeMessage_p = document.getElementById("codeMessage");
const startMessage_span = document.getElementById("startMessage");
const startBtn = document.querySelector('#startGameBtn');
const userScore_span = document.querySelector('#userScore');
const opponentScore_span = document.querySelector('#opponentScore');
const userLabel_div = document.querySelector('#userLabel');
const oppLabel_div = document.querySelector('#opponentLabel');
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

/******************************
 * Event Listeners
 *****************************/
playBtn.addEventListener('click', () =>{
   socket.emit('ready', userScore);
   playBtn.classList.add("hidden");

});

function gameBoardListeners(){
   removeSelected();
   rock_div.addEventListener('click', () => {
      removeSelected();
      rock_div.classList.add('selected');
      socket.emit('choiceMade', 'Rock')
   });
   paper_div.addEventListener('click', () => {
      removeSelected();
      paper_div.classList.add('selected');
      socket.emit('choiceMade', 'Paper')
   });
   scissors_div.addEventListener('click', () => {
      removeSelected();
      scissors_div.classList.add('selected');
      socket.emit('choiceMade', 'scissors')
   });
   lizard_div.addEventListener('click', () => {
      removeSelected();
      lizard_div.classList.add('selected');
      socket.emit('choiceMade', 'Lizard')
   });
   spock_div.addEventListener('click', () => {
      removeSelected();
      spock_div.classList.add('selected');
      socket.emit('choiceMade', 'Spock')
   });
}

/*******************************************
 * Functions: they make the world go round
 ******************************************/
function onLoad(){
   setGameBoardMode();
   if(code === "new"){
      socket.emit('newGame', { 
         name,
         mode      
      });

   } else {
      socket.emit('joinGame', {
         playerName: name,
         gameCode: code
      });
   }
}
 
function setGameBoardMode(){
   if (mode == 3){
      document.querySelector('#notClassic').classList.add("hidden");
      document.querySelector('#lizard').classList.add("hidden");
      document.querySelector('#spock').classList.add("hidden");
   } else {
      document.querySelector('#notClassic').classList.remove("hidden");
      document.querySelector('#lizard').classList.remove("hidden");
      document.querySelector('#spock').classList.remove("hidden");
   }
}

function handleInit(number){
   console.log(`Player number is ${number}`);
   titleName1_span.innerHTML = name;
   playerNum = number;
   if(number === 1){
   startMessage_span.innerHTML = "Waiting for your opponent to join..."
   startBtn.classList.add("hidden");
   }
}

function handleGameCode(gameCode) {
   codeMessage_p.innerHTML = gameCode;
}

function handleUnknownCode() {
   startMessage_span.innerHTML = 'Unknown Game Code';
   startBtn.innerHTML = 'Return to Home Screen';
   startBtn.addEventListener('click', () => {
      location.href = "./";
   });
 }
 
 function handleTooManyPlayers() {
   startMessage_span.innerHTML = 'This game is already in progress' ;
   startBtn.innerHTML = 'Return to Home Screen';
   startBtn.addEventListener('click', () => {
      location.href = "./";
   });
 }

 function handleReady(data){
   document.querySelectorAll('.startScreen')[0].classList.add('hidden');
   gameResult_div.classList.remove("hidden");
   result_p.innerHTML = "Tell me when you're ready..."
   mode = data[0].mode;
   setGameBoardMode();
   if(playerNum === 1){
   titleName2_span.innerHTML= data[1].username;
   userLabel_div.innerHTML= data[0].username;
   oppLabel_div.innerHTML= data[1].username;
   } else {
      titleName2_span.innerHTML= data[0].username;
      userLabel_div.innerHTML= data[1].username;
      oppLabel_div.innerHTML= data[0].username;
   }
 }

 function handleWaiting(msg){
   gameResult_div.classList.add("hidden");
   document.querySelectorAll('.startScreen')[0].classList.remove('hidden');
   startMessage_span.innerHTML = msg;
 }

 function gameTime() {
   gameBoardListeners();
   scoreBoard_div.classList.remove('hidden');
   gameBoard_div.classList.remove('hidden');
   gameResult_div.classList.add("hidden");
   document.querySelectorAll('.startScreen')[0].classList.add('hidden');
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
      // need to let the server know we are ready for the results
      result_p.innerHTML = resultMessage;

      userScore_span.innerHTML = userScore;
      opponentScore_span.innerHTML = opponentScore;
      gameResult_div.classList.remove("hidden");
   }, 3200);
}

function matchEnded(gameData){
   let ply1;
   let ply2;
   if(playerNum === 1){
      ply1 = gameData[0];
      ply2 = gameData[1]
   } else {
      ply1 = gameData[1];
      ply2 = gameData[0]
   }
   console.log(`ply1: ${ply1.selection} ply2: ${ply2.selection}`);

   const outcome = match(ply1.selection, ply2.selection);
   result_p.innerHTML = outcome.message;
   if(outcome.result === 1){
      userScore++;
   } else if (outcome.result === 2){
      opponentScore++;
   }
   gameBoard_div.classList.add("hidden");
   userScore_span.innerHTML = userScore;
   opponentScore_span.innerHTML = opponentScore;
   gameResult_div.classList.remove("hidden");
   playBtn.classList.remove("hidden");
} 

function handleGameOver(message) {
   gameResult_div.classList.add('hidden');
   document.querySelectorAll('.startScreen')[0].classList.remove('hidden');
   startBtn.classList.remove('hidden');
   startMessage_span.innerHTML = message ;
   startBtn.innerHTML = 'Return to Home Screen';
   startBtn.addEventListener('click', () => {
      location.href = "./";
   });
}

 onLoad();