
import { classicMode } from './utils.js';

const switch1_input = document.querySelector('#switch1 > input');
const switch2_input = document.querySelector('#switch2 > input');
const name_input = document.querySelector('#nameField > input');
const code_input = document.querySelector('#gameCode > input');
const gameCode_div = document.querySelector('#gameCode');
const startBtn = document.querySelector('#startGameBtn');
const newVsGameBtn = document.querySelector('#newVsGameBtn');
const joinBtn = document.querySelector('#joinVsGameBtn');
const or_h1 = document.querySelector('.startScreen > h1');

switch1_input.addEventListener('change', singlePlayerMode);
switch2_input.addEventListener('change', classicMode);
startBtn.addEventListener('click', loadSinglePlyGame);
newVsGameBtn.addEventListener('click', newTwoPlyGame);
joinBtn.addEventListener('click', joinTwoPlyGame);

function singlePlayerMode() {
   if (switch1_input.checked){
      document.querySelector('#twoPlayer').style.color = "#EFEFEF";
      document.querySelector('#singlePlay').style.color = "#efefef2a";
      or_h1.classList.remove("hidden");
      gameCode_div.classList.remove("hidden");
      joinBtn.classList.remove("hidden");
      newVsGameBtn.classList.remove("hidden");
      startBtn.classList.add("hidden");
   } else {
      document.querySelector('#singlePlay').style.color = "#EFEFEF";
      document.querySelector('#twoPlayer').style.color = "#efefef2a";
      or_h1.classList.add("hidden");
      gameCode_div.classList.add("hidden");
      joinBtn.classList.add("hidden");
      newVsGameBtn.classList.add("hidden");
      startBtn.classList.remove("hidden");
   }
}

function loadSinglePlyGame(){
   let name = name_input.value;
   sessionStorage.setItem("name", name);

   // Redirect to the single player page
   location.href = "./singlePlayer.html";
}

function newTwoPlyGame(){
   let name = name_input.value;
   let mode = 5;
   if (switch2_input.checked){
      mode = 3;
   }
   sessionStorage.setItem("name", name);
   sessionStorage.setItem("mode", mode);
   sessionStorage.setItem("code", "new");

   // Redirect to the two player page
   location.href = "./twoPlayer.html";
}

function joinTwoPlyGame(){
   let name = name_input.value;
   let code = code_input.value;
   sessionStorage.setItem("name", name);
   sessionStorage.setItem("code", code);

   // Redirect to the two player page
   location.href = "./twoPlayer.html";
}