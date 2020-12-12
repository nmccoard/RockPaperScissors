
module.exports = {
   makeID,
   checkSelection
 }

/**************************
 * This function creates a random string that can be used for an id
 *************************/

function makeID(length) {
   let result           = '';
   const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


function checkSelection(selection){
   switch(selection) {
      case "Rock":
      case "Paper":
      case "Scissors":
      case "Lizard":
      case "Spock":
         return selection;
      default:
         return false;
   }
}