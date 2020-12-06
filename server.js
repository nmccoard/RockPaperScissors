const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
