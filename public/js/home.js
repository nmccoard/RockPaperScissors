/*****************************
* IMPORTS
****************************/
import { classicMode } from './utils.js';
import * as DC from './domConst.js';

/******************************
 * Event Listeners
 *****************************/
DC.switch1_input.addEventListener('change', switchModes);
DC.switch2_input.addEventListener('change', classicMode);
DC.startBtn.addEventListener('click', loadSinglePlyGame);
DC.newVsGameBtn.addEventListener('click', newTwoPlyGame);
DC.joinBtn.addEventListener('click', joinTwoPlyGame);

/******************************
 * Functions
 *****************************/
function switchModes() {
   if (DC.switch1_input.checked){
      document.querySelector('#twoPlayer').style.color = "#EFEFEF";
      document.querySelector('#singlePlay').style.color = "#efefef2a";
      DC.or_h1.classList.remove("hidden");
      DC.gameCode_div.classList.remove("hidden");
      DC.joinBtn.classList.remove("hidden");
      DC.newVsGameBtn.classList.remove("hidden");
      DC.startBtn.classList.add("hidden");
   } else {
      document.querySelector('#singlePlay').style.color = "#EFEFEF";
      document.querySelector('#twoPlayer').style.color = "#efefef2a";
      DC.or_h1.classList.add("hidden");
      DC.gameCode_div.classList.add("hidden");
      DC.joinBtn.classList.add("hidden");
      DC.newVsGameBtn.classList.add("hidden");
      DC.startBtn.classList.remove("hidden");
   }
}

function loadSinglePlyGame(){
   let name = DC.name_input.value;
   sessionStorage.setItem("name", name);
   location.href = "./singlePlayer.html";
}

function newTwoPlyGame(){
   let name = DC.name_input.value;
   let mode = 5;
   if (DC.switch2_input.checked){
      mode = 3;
   }
   sessionStorage.setItem("name", name);
   sessionStorage.setItem("mode", mode);
   sessionStorage.setItem("code", "new");
   location.href = "./twoPlayer.html";
}

function joinTwoPlyGame(){
   let name = DC.name_input.value;
   let code = DC.code_input.value;
   sessionStorage.setItem("name", name);
   sessionStorage.setItem("code", code);
   location.href = "./twoPlayer.html";
}