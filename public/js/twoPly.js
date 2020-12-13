/*****************************
* IMPORTS
****************************/
import { removeSelected, match } from './utils.js';
import * as DC from './domConst.js';

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
let gameWon = false;

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
 * Event Listeners
 *****************************/
DC.playBtn.addEventListener('click', () =>{
   socket.emit('ready', userScore);
   DC.playBtn.classList.add("hidden");

});

function gameBoardListeners(){
   removeSelected();
   DC.rock_div.addEventListener('click', () => {
      removeSelected();
      DC.rock_div.classList.add('selected');
      socket.emit('choiceMade', 'Rock')
   });
   DC.paper_div.addEventListener('click', () => {
      removeSelected();
      DC.paper_div.classList.add('selected');
      socket.emit('choiceMade', 'Paper')
   });
   DC.scissors_div.addEventListener('click', () => {
      removeSelected();
      DC.scissors_div.classList.add('selected');
      socket.emit('choiceMade', 'Scissors')
   });
   DC.lizard_div.addEventListener('click', () => {
      removeSelected();
      DC.lizard_div.classList.add('selected');
      socket.emit('choiceMade', 'Lizard')
   });
   DC.spock_div.addEventListener('click', () => {
      removeSelected();
      DC.spock_div.classList.add('selected');
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
         playerName: name,
         mode: mode      
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
   DC.titleName1_span.innerHTML = name;
   playerNum = number;
   if(number === 1){
   DC.startMessage_span.innerHTML = "Waiting for your opponent to join..."
   DC.startBtn.classList.add("hidden");
   }
}

function handleGameCode(gameCode) {
   DC.codeMessage_p.innerHTML = gameCode;
}

function handleUnknownCode() {
   DC.startMessage_span.innerHTML = 'Unknown Game Code';
   DC.startBtn.innerHTML = 'Return to Home Screen';
   DC.startBtn.addEventListener('click', () => {
      location.href = "./";
   });
 }
 
 function handleTooManyPlayers() {
   DC.startMessage_span.innerHTML = 'This game is already in progress' ;
   DC.startBtn.innerHTML = 'Return to Home Screen';
   DC.startBtn.addEventListener('click', () => {
      location.href = "./";
   });
 }

 function handleReady(data){
   document.querySelectorAll('.startScreen')[0].classList.add('hidden');
   DC.gameBoard_div.classList.add('hidden');
   DC.gameResult_div.classList.remove("hidden");
   DC.result_p.innerHTML = "Tell me when you're ready...";
   mode = data[0].mode;
   setGameBoardMode();
   if(playerNum === 1){
   DC.titleName2_span.innerHTML= data[1].username;
   DC.userLabel_div.innerHTML= data[0].username;
   DC.oppLabel_div.innerHTML= data[1].username;
   } else {
      DC.titleName2_span.innerHTML= data[0].username;
      DC.userLabel_div.innerHTML= data[1].username;
      DC.oppLabel_div.innerHTML= data[0].username;
   }
 }

 function handleWaiting(msg){
   DC.gameResult_div.classList.add("hidden");
   document.querySelectorAll('.startScreen')[0].classList.remove('hidden');
   DC.startMessage_span.innerHTML = msg;
 }

 function gameTime() {
   gameBoardListeners();
   DC.scoreBoard_div.classList.remove('hidden');
   DC.gameBoard_div.classList.remove('hidden');
   DC.gameResult_div.classList.add("hidden");
   document.querySelectorAll('.startScreen')[0].classList.add('hidden');
   setTimeout( () => {
      DC.timeMessage_p.innerHTML = "Rock"
   }, 400);
   setTimeout( () => {
      DC.timeMessage_p.innerHTML = "Paper";
   }, 1300);
   setTimeout( () => {
      DC.timeMessage_p.innerHTML = "Scissors";
   }, 2200);
   setTimeout( () => {
      DC.timeMessage_p.innerHTML = "Shoot!";
   }, 3100)
   setTimeout( () => {
      DC.gameBoard_div.classList.add("hidden");
      // need to let the server know we are ready for the results
      DC.result_p.innerHTML = resultMessage;

      DC.userScore_span.innerHTML = userScore;
      DC.opponentScore_span.innerHTML = opponentScore;
      DC.gameResult_div.classList.remove("hidden");
   }, 3800);
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

   if(!gameWon){
   const outcome = match(ply1.selection, ply2.selection);
   DC.result_p.innerHTML = outcome.message;
   if(outcome.result === 1){
      userScore++;
   } else if (outcome.result === 2){
      opponentScore++;
   }
   DC.gameBoard_div.classList.add("hidden");
   DC.userScore_span.innerHTML = userScore;
   DC.opponentScore_span.innerHTML = opponentScore;
   DC.gameResult_div.classList.remove("hidden");
   DC.playBtn.classList.remove("hidden");
}
} 

function handleGameOver(message) {
   gameWon = true;
   DC.gameResult_div.classList.add('hidden');
   DC.gameBoard_div.classList.add('hidden');
   document.querySelectorAll('.startScreen')[0].classList.remove('hidden');
   DC.startBtn.classList.remove('hidden');
   DC.startMessage_span.innerHTML = message ;
   DC.startBtn.innerHTML = 'Return to Home Screen';
   DC.startBtn.addEventListener('click', () => {
      location.href = "./";
   });
}

 onLoad();