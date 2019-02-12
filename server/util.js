const actions = require('./actions.js');

function sendStatus(socket) {
  const waitStatus = setInterval(() => {
    if (socket.readyState === 1) {
      socket.send(JSON.stringify(actions.waitStatus(socket.waitStatus)));
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

function sendMessages(socket, data, type, counter = 0) {
  if (counter === 3) {
    return counter;
  }
  if (socket.opponent && socket.opponent.readyState === 1) {
    let body = '';
    if (type === 'CODE') {
      body = actions.code(data);
    }
    if (type === 'DESCRIPTION') {
      body = actions.description(data);
    }
    socket.opponent.send(JSON.stringify(body));
    return counter;
  }
  return sendMessages(socket, data, type, counter + 1);
}

module.exports = { sendStatus, sendMessages };
