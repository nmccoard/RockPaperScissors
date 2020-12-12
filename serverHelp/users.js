const users = [];

// Join user to chat
function userJoin(id, username, room, playerNum, mode) {
   const user = { 
      id, 
      username, 
      room, 
      playerNum,
      mode,
      ready: 0,
      selection: "Potato",
      score: 0,
    };
 
   users.push(user);
 
   return user;
 }

// Get current user
function getCurrentUser(id) {
   return users.find(user => user.id === id);
}

// User leaves
function userLeaves(id) {
   const index = users.findIndex(user => user.id === id);

   if(index != -1){
      return users.splice(index, 1)[0];
   }
}

// Get room users
function getRoomUsers(room) {
   return users.filter(user => user.room === room);
}

module.exports = {
   userJoin,
   getCurrentUser,
   userLeaves,
   getRoomUsers
};