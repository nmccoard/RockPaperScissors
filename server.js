const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers
} = require('./serverHelp/users.js');
const {
  makeID,
  checkSelection
} = require('./serverHelp/utils.js');

const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const state = {};
const clientRooms = {};

const io = socketIO(server);

io.on('connection', (client) => {
  console.log('Client connected');
  client.on('disconnect', () => {
    const user = userLeaves(client.id);
  });

  client.on('choiceMade', (choice) => {
    const user = getCurrentUser(client.id);
    if (checkSelection(choice)) {
      user.selection = choice;
    }
    console.log(`${user.username} selected ${user.selection}`);
  });

  // Creat a new room
  client.on('newGame', ({ playerName, mode }) => {
    console.log(playerName);
    let roomName = makeID(6);
    client.emit('gameCode', roomName);
    const user = userJoin(client.id, playerName, roomName, 1, mode);
    client.join(user.room);
    console.log(user);
    client.emit('init', 1);
  });

  // Join Room
  client.on('joinGame', ({ playerName, gameCode }) => {
    // Check to see if the rooms is a valid room
    if (getRoomUsers(gameCode).length === 0) {
      client.emit('unknownCode');
      return;
    }
    // make sure there are only 1 player before joining
    if (getRoomUsers(gameCode).length > 1) {
      client.emit('tooManyPlayers');
      return;
    }

    const user = userJoin(client.id, playerName, gameCode, 2, 5);
    client.join(user.room);
    client.emit('init', 2);
    client.emit('gameCode', user.room);
    io.to(user.room).emit('sendReady', getRoomUsers(user.room));
  });

  client.on('ready', (score) => {
    const user = getCurrentUser(client.id);
    user.ready++;
    user.score = score;
    let userList = getRoomUsers(user.room);
    if (userList[0].ready === userList[1].ready) {
      startGameInterval(user.room, userList);
    } else if (user.playerNum === 1) {
      client.emit('waitingOnPlayer', `Waiting on ${userList[1].username}...`);
    } else {
      client.emit('waitingOnPlayer', `Waiting on ${userList[0].username}...`);
    }
  });

});

function startGameInterval(room, gameData) {
  if (gameData[0].sore < 3 || gameData[1].score < 3) {
    io.to(room).emit('startMatch');
    setTimeout(() => {
      io.to(room).emit('matchEnded', gameData);
      gameData[0].selection = "Potato";
      gameData[1].selection = "Potato";
    }, 4000);
  } else {
    if (gameData[0].score >= 3) {
      emitGameOver(room, gameData[0].username);
    } else {
      emitGameOver(room, gameData[1].username);
    }
  }

}

function emitGameOver(room, winner) {
  // tell everyone when the game is over.
  io.to(room).emit('gameOver', `${winner} is the Winner!`);
}
