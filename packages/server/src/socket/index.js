const baseIO = require('socket.io');
const { getRounds } = require('../play');
const { time } = require('../../../shared/constants');
const {
  sleep,
  race,
  getUsers,
  gameId,
} = require('../utils');

function setSocketIO(http) {
  const io = baseIO(http);

  io.on('connection', (socket) => {
    const emitUsers = () => io.to(socket.room).emit('users', getUsers(io.sockets, socket.room));

    // LOGIN
    socket.on('add user', (username) => {
      socket.room = gameId.id; // eslint-disable-line
      socket.join(socket.room);
      socket.username = username; // eslint-disable-line
      socket.score = 0; // eslint-disable-line
      emitUsers();
    });

    // LOBBY
    socket.on('start game', () => {
      socket.to(socket.room).emit('start game');
      gameId.newGameId();

      // GAME
      const connectedUsers = getUsers(io.sockets, socket.room);
      const roundQuantity = 3;
      const rounds = getRounds(roundQuantity, connectedUsers);
      let round;

      const emitRounds = async () => {
        round = rounds.pop();
        io.to(socket.room).emit('round');
        await sleep(time.SHOW_SCORE_SECONDS);
        emitPlays(); // eslint-disable-line
      };

      const emitPlays = async () => {
        io.sockets.adapter.rooms[socket.room].play = round.pop();
        io.to(socket.room).emit(
          'play',
          io.sockets.adapter.rooms[socket.room].play,
        );
        const chooseWordPromise = new Promise((resolve) => {
          io.sockets.adapter.rooms[socket.room].resolveWordPicked = resolve;
        });
        await race([chooseWordPromise, sleep(time.SHOW_WORD_SECONDS)]);
        // also could skip player
        if (!io.sockets.adapter.rooms[socket.room].play.word) {
          io.sockets.adapter.rooms[socket.room].play.word =          io.sockets.adapter.rooms[socket.room].play.words[0]; // eslint-disable-line
        }
        io.to(socket.room).emit(
          'word chosen',
          io.sockets.adapter.rooms[socket.room].play,
        );
        const allUsersGuessedPromise = new Promise((resolve) => {
          io.sockets.adapter.rooms[socket.room].resolveAllUsersGuessed = resolve;
        });
        await race([allUsersGuessedPromise, sleep(time.PLAY_SECONDS)]);
        io.sockets.adapter.rooms[socket.room].play = null;
        if (round.length) {
          emitPlays();
        } else if (rounds.length) {
          emitRounds();
        } else {
          io.to(socket.room).emit('round');
        }
      };

      emitRounds();
    });

    socket.on('word chosen', (word) => {
      io.sockets.adapter.rooms[socket.room].play.word = word;
      io.sockets.adapter.rooms[socket.room].resolveWordPicked();
    });

    // CHAT
    socket.on('message', (message) => {
      const { username } = socket;
      if (
        io.sockets.adapter.rooms[socket.room].play
        && message.toLowerCase()
          === io.sockets.adapter.rooms[socket.room].play.word.toLowerCase()
      ) {
        if (
          username !== io.sockets.adapter.rooms[socket.room].play.username
          && !io.sockets.adapter.rooms[socket.room].play.usersThatScored.includes(
            username,
          )
        ) {
          if (
            io.sockets.adapter.rooms[socket.room].play.usersThatScored.push(
              username,
            )
            === getUsers(io.sockets, socket.room).length - 1
          ) {
            io.sockets.adapter.rooms[socket.room].resolveAllUsersGuessed();
          }
          socket.score += 10; // eslint-disable-line
          emitUsers();
        }
      } else {
        socket.to(socket.room).emit('message', {
          username,
          message,
        });
      }
    });

    // CANVAS
    socket.on('drawing', (data) => {
      socket.to(socket.room).emit('drawing', data);
    });

    socket.on('clear canvas', () => {
      socket.to(socket.room).emit('clear canvas');
    });

    socket.on('undo canvas', () => {
      socket.to(socket.room).emit('undo canvas');
    });

    socket.on('disconnect', () => emitUsers);
  });
}

module.exports = setSocketIO;
