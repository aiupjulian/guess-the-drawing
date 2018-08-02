import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

const subscribeToUsers = (callback) => {
    socket.on('users', users => callback(users));
};

const emitAddUsername = (username) => {
    socket.emit('add user', username);
};

const emitStartGame = () => {
    socket.emit('start game');
};

const subscribeToStartGame = (callback) => {
    socket.on('start game', () => callback());
};

export {
    emitAddUsername,
    emitStartGame,
    subscribeToStartGame,
    subscribeToUsers,
};
