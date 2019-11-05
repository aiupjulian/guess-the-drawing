import openSocket from 'socket.io-client';

const socket = openSocket(`http://${SERVER_HOST}:${SERVER_PORT}`);

// EMIT
const emit = event => data => socket.emit(event, data);

const emitAddUser = user => emit('add user')(user);

const emitCanvas = data => emit('canvas')(data);

const emitClearCanvas = () => emit('clear canvas')();

const emitDrawing = data => emit('drawing')(data);

const emitMessage = message => emit('message')(message);

const emitStartGame = () => emit('start game')();

const emitUndoCanvas = () => emit('undo canvas')();

const emitWordChosen = word => emit('word chosen')(word);

// SUBSCRIBE
const subscribe = event => callback => socket.on(event, data => callback(data));

const subscribeToCanvas = callback => subscribe('canvas')(callback);

const subscribeToClearCanvas = callback => subscribe('clear canvas')(callback);

const subscribeToDrawing = callback => subscribe('drawing')(callback);

const subscribeToMessage = callback => subscribe('message')(callback);

const subscribeToPlay = callback => subscribe('play')(callback);

const subscribeToRound = callback => subscribe('round')(callback);

const subscribeToStartGame = callback => subscribe('start game')(callback);

const subscribeToUndoCanvas = callback => subscribe('undo canvas')(callback);

const subscribeToUsers = callback => subscribe('users')(callback);

const subscribeToWordChosen = callback => subscribe('word chosen')(callback);

export {
  emitAddUser,
  emitCanvas,
  emitClearCanvas,
  emitDrawing,
  emitMessage,
  emitStartGame,
  emitUndoCanvas,
  emitWordChosen,
  subscribeToCanvas,
  subscribeToClearCanvas,
  subscribeToDrawing,
  subscribeToMessage,
  subscribeToPlay,
  subscribeToRound,
  subscribeToStartGame,
  subscribeToUndoCanvas,
  subscribeToUsers,
  subscribeToWordChosen
};
