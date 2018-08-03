import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

const emit = (event, data) => {
    socket.emit(event, data);
};

const emitAddUser = (username) => {
    emit('add user', username);
};

const emitCanvas = (data) => {
    emit('canvas', data);
};

const emitMessage = (message) => {
    emit('message', message);
};

const emitStartGame = () => {
    emit('start game');
};

const subscribe = (event, callback) => {
    socket.on(event, data => callback(data));
};

const subscribeToCanvas = (callback) => {
    subscribe('canvas', callback);
};

const subscribeToMessage = (callback) => {
    subscribe('message', callback);
};

const subscribeToStartGame = (callback) => {
    subscribe('start game', callback);
};

const subscribeToUsers = (callback) => {
    subscribe('users', callback);
};

export {
    emitAddUser,
    emitCanvas,
    emitMessage,
    emitStartGame,
    subscribeToCanvas,
    subscribeToMessage,
    subscribeToStartGame,
    subscribeToUsers,
};
