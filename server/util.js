const actions = require('./actions.js');

function sendStatus(socket) {
  const waitStatus = setInterval(() => {
    if (socket.readyState === 1) {
      const status = actions.waitStatus(socket.waitStatus);
      socket.send(JSON.stringify(status));
      if (socket.roomId) {
        const roomId = actions.joinedRoom(
          socket.roomId,
          socket.opponent.userName
        );
        socket.send(JSON.stringify(roomId));
        clearInterval(waitStatus);
      }
    }
  }, 1000);
}

function sendMessages(socket, data, type) {
  if (socket.opponent.readyState === 1) {
    let body = '';
    if (type === 'CODE') {
      body = actions.code(data);
    }
    if (type === 'DESCRIPTION') {
      body = actions.description(data);
    }
    socket.opponent.send(JSON.stringify(body));
  } else {
    socket.opponent.terminate();
  }
}

module.exports = { sendStatus, sendMessages };
