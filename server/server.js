const WebSocket = require('ws');
const LobbyCntr = require('./lobby.js');
const util = require('./util.js');

const ws = new WebSocket.Server({
  port: 8001,
  clientTracking: true
});

const Lobby = new LobbyCntr();
Lobby.addToProcessQueue();
Lobby.addToWaitingQue();
Lobby.createRoom();
Lobby.removeRoom();

// setInterval(() => console.log(Lobby), 5000);

ws.on('connection', socket => {
  Lobby.addToGeneralQueue(socket);

  util.sendStatus(socket);

  socket.on('message', data => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'JOIN_ROOM': {
        // console.log(payload);
        socket.userName = payload;
        break;
      }
      case 'DESCRIPTION': {
        // console.log('description broken', data);
        util.sendMessages(socket, payload, 'DESCRIPTION');
        break;
      }
      case 'CODE': {
        // console.log('CODE broken', socket);
        util.sendMessages(socket, payload, 'CODE');
        break;
      }
      default: {
        console.log('unrecognized type');
      }
    }
  });
});

ws.on('close', message => {
  console.log('disconnected');
});
