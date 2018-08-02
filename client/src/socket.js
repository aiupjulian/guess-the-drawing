import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

const emitAddUsername = (username) => {
    socket.emit('add user', username);
};

const emitMessage = (message) => {
    socket.emit('message', message);
};

const emitStartGame = () => {
    socket.emit('start game');
};

const subscribeToMessage = (callback) => {
    socket.on('message', data => callback(data));
};

const subscribeToStartGame = (callback) => {
    socket.on('start game', () => callback());
};

const subscribeToUsers = (callback) => {
    socket.on('users', users => callback(users));
};

export {
    emitAddUsername,
    emitMessage,
    emitStartGame,
    subscribeToMessage,
    subscribeToStartGame,
    subscribeToUsers,
};
