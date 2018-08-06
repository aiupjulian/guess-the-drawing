import openSocket from 'socket.io-client';

// FIXME: CONFIGURE HOST IN ENV
const socket = openSocket('http://192.168.0.50:8081');

// EMIT
const emit = (event, data) => {
    socket.emit(event, data);
};

const emitAddUser = (username) => {
    emit('add user', username);
};

const emitCanvas = (data) => {
    emit('canvas', data);
};

const emitClearCanvas = () => {
    emit('clear canvas');
};

const emitDrawing = (data) => {
    emit('drawing', data);
};

const emitMessage = (message) => {
    emit('message', message);
};

const emitStartGame = () => {
    emit('start game');
};

const emitUndoCanvas = () => {
    emit('undo canvas');
};

// SUBSCRIBE
const subscribe = (event, callback) => {
    socket.on(event, data => callback(data));
};

const subscribeToCanvas = (callback) => {
    subscribe('canvas', callback);
};

const subscribeToClearCanvas = (callback) => {
    subscribe('clear canvas', callback);
};

const subscribeToDrawing = (callback) => {
    subscribe('drawing', callback);
};

const subscribeToMessage = (callback) => {
    subscribe('message', callback);
};

const subscribeToStartGame = (callback) => {
    subscribe('start game', callback);
};

const subscribeToUndoCanvas = (callback) => {
    subscribe('undo canvas', callback);
};

const subscribeToUsers = (callback) => {
    subscribe('users', callback);
};

export {
    emitAddUser,
    emitCanvas,
    emitClearCanvas,
    emitDrawing,
    emitMessage,
    emitStartGame,
    emitUndoCanvas,
    subscribeToCanvas,
    subscribeToClearCanvas,
    subscribeToDrawing,
    subscribeToMessage,
    subscribeToStartGame,
    subscribeToUndoCanvas,
    subscribeToUsers,
};
