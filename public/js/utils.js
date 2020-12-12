export function classicMode() {
   if (document.querySelector('#switch2 > input').checked) {
      document.querySelector('#classicTag').style.color = "#EFEFEF";
      document.querySelector('#epicTag').style.color = "#efefef2a";
      document.querySelector('#notClassic').classList.add("hidden");
      document.querySelector('#lizard').classList.add("hidden");
      document.querySelector('#spock').classList.add("hidden");
   } else {
      document.querySelector('#classicTag').style.color = "#efefef2a";
      document.querySelector('#epicTag').style.color = "#EFEFEF";
      document.querySelector('#notClassic').classList.remove("hidden");
      document.querySelector('#lizard').classList.remove("hidden");
      document.querySelector('#spock').classList.remove("hidden");
   }
}

export function removeSelected() {
   const list = ["rock", "paper", "scissors", "lizard", "spock"];

   for (let i = 0; i < list.length; i++) {
      document.querySelector(`#${list[i]}`).classList.remove('selected');
   }
}

// This function checks to see who won
export function match(ply1Choice, ply2Choice) {
   switch (ply1Choice + ' ' + ply2Choice) {
      // Only Winners here   
      case 'Rock Scissors':
         return {
            message: `You WIN!<br>Your ${ply1Choice} crushed their ${ply2Choice}.`,
               result: 1
         };
      case 'Rock Lizard':
         return {
            message: `You WIN!<br>Your ${ply1Choice} crushed their ${ply2Choice}.`,
               result: 1
         };
      case 'Paper Rock':
         return {
            message: `You WIN!<br>Your ${ply1Choice} covered their ${ply2Choice}.`,
               result: 1
         };
      case 'Paper Spock':
         return {
            message: `You WIN!<br>Your ${ply1Choice} disproved ${ply2Choice}.`,
               result: 1
         };
      case 'Scissors Paper':
         return {
            message: `You WIN!<br>Your ${ply1Choice} cut their ${ply2Choice}.`,
               result: 1
         };
      case 'Scissors Lizard':
         return {
            message: `You WIN!<br>Your ${ply1Choice} decapitated their ${ply2Choice}.`,
               result: 1
         };
      case 'Lizard Spock':
         return {
            message: `You WIN!<br>Your ${ply1Choice} poisoned ${ply2Choice}.`,
               result: 1
         };
      case 'Lizard Paper':
         return {
            message: `You WIN!<br>Your ${ply1Choice} ate their ${ply2Choice}.`,
               result: 1
         };
      case 'Spock Rock':
         return {
            message: `You WIN!<br>${ply1Choice} vaporized ${ply2Choice}.`,
               result: 1
         };
      case 'Spock Scissors':
         return {
            message: `You WIN!<br>${ply1Choice} broke their ${ply2Choice}.`,
               result: 1
         };
      case 'Rock Potato':
      case 'Paper Potato':
      case 'Scissors Potato':
      case 'Lizard Potato':
      case 'Spock Potato':
         return {
            message: "Player 2 sat there like a potato and got smashed!",
            result: 1
         }
      // Loser bracket
      case 'Scissors Rock':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} smashed your ${ply1Choice}.`,
               result: 2
         };
      case 'Lizard Rock':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} crushed your ${ply1Choice}.`,
               result: 2
         };
      case 'Rock Paper':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} covers your ${ply1Choice}.`,
               result: 2
         };
      case 'Spock Paper':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} disproves ${ply1Choice}.`,
               result: 2
         };
      case 'Paper Scissors':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} shredded your ${ply1Choice}.`,
               result: 2
         };
      case 'Lizard Scissors':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} decapitated your ${ply1Choice}.`,
               result: 2
         };
      case 'Spock Lizard':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} poisoned ${ply1Choice}.`,
               result: 2
         };
      case 'Paper Lizard':
         return {
            message: `You Lose :(<br>Their ${ply2Choice} ate your ${ply1Choice}.`,
               result: 2
         };
      case 'Rock Spock':
         return {
            message: `You Lose :(<br>${ply2Choice} vaporized your ${ply1Choice}.`,
               result: 2
         };
      case 'Scissors Spock':
         return {
            message: `You Lose :(<br>${ply2Choice} broke your ${ply1Choice}.`,
               result: 2
         };
      case 'Potato Rock':
      case 'Potato Paper':
      case 'Potato Scissors':
      case 'Potato Lizard':
      case 'Potato Spock':
         return {
            message: "Player 1 sat there like a potato and got smashed!",
               result: 2
         }
      // Its a tie...      
      case 'Rock Rock':
      case 'Paper Paper':
      case 'Scissors Scissors':
      case 'Lizard Lizard':
      case 'Spock Spock':
      case 'Potato Potato':
         return {
            message: `It's a draw<br>${ply1Choice} = ${ply2Choice}.`,
               result: 0
         };
   }
}