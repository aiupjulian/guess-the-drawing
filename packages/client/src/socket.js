import openSocket from 'socket.io-client';
import { constants } from 'canvas-shared';

const {
  ADD_USER,
  CANVAS,
  CLEAR_CANVAS,
  DRAWING,
  MESSAGE,
  PLAY,
  ROUND,
  START_GAME,
  UNDO_CANVAS,
  USERS,
  WORD_CHOSEN,
} = constants.events;

const socket = openSocket(`http://${SERVER_HOST}:${SERVER_PORT}`);

// EMIT
const emit = event => data => socket.emit(event, data);

const emitAddUser = user => emit(ADD_USER)(user);

const emitCanvas = data => emit(CANVAS)(data);

const emitClearCanvas = () => emit(CLEAR_CANVAS)();

const emitDrawing = data => emit(DRAWING)(data);

const emitMessage = message => emit(MESSAGE)(message);

const emitStartGame = () => emit(START_GAME)();

const emitUndoCanvas = () => emit(UNDO_CANVAS)();

const emitWordChosen = word => emit(WORD_CHOSEN)(word);

// SUBSCRIBE
const subscribe = event => callback => socket.on(event, data => callback(data));

const subscribeToCanvas = callback => subscribe(CANVAS)(callback);

const subscribeToClearCanvas = callback => subscribe(CLEAR_CANVAS)(callback);

const subscribeToDrawing = callback => subscribe(DRAWING)(callback);

const subscribeToMessage = callback => subscribe(MESSAGE)(callback);

const subscribeToPlay = callback => subscribe(PLAY)(callback);

const subscribeToRound = callback => subscribe(ROUND)(callback);

const subscribeToStartGame = callback => subscribe(START_GAME)(callback);

const subscribeToUndoCanvas = callback => subscribe(UNDO_CANVAS)(callback);

const subscribeToUsers = callback => subscribe(USERS)(callback);

const subscribeToWordChosen = callback => subscribe(WORD_CHOSEN)(callback);

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
  subscribeToWordChosen,
};
