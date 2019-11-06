const uuidv4 = require('uuid/v4');

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const race = promises => Promise.race(promises);

const getSockets = (sockets, room) => {
  const users = (sockets.adapter.rooms[room]
      && sockets.adapter.rooms[room].sockets)
    || {};
  return Object.entries(users)
    .filter(([status]) => status)
    .map(([id]) => sockets.connected[id]);
};

const getUsers = (sockets, room) => Object.values(getSockets(sockets, room))
  .filter(connectedSocket => connectedSocket.username)
  .map(({ username, score }) => ({ username, score }));

const gameId = {
  id: uuidv4(),
  newGameId() {
    this.id = uuidv4();
  },
};

module.exports = {
  sleep,
  race,
  getSockets,
  getUsers,
  gameId,
};
