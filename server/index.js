const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();
const { getRounds } = require('./play');

const usersEmit = () => {
    io.emit(
        'users',
        Object.values(io.sockets.connected)
            .filter(connectedSocket => connectedSocket.username)
            .map(({ username, score }) => ({ username, score })),
    );
};

const sleep = miliseconds => new Promise(resolve => setTimeout(resolve, miliseconds));

io.on('connection', (socket) => {
    let play;

    // LOGIN
    socket.on('add user', (user) => {
        socket.join(user.room);
        socket.username = user.username; // eslint-disable-line
        socket.score = 0; // eslint-disable-line
        usersEmit();
    });

    // LOBBY
    socket.on('start game', () => {
        socket.broadcast.emit('start game');

        // GAME
        const connectedUsers = Object.values(io.sockets.connected)
            .filter(connectedSocket => connectedSocket.username)
            .map(({ username }) => username);
        const roundQuantity = 3;
        const showWordTimeInSeconds = 10;
        const playTimeInSeconds = 12;
        const showScoreTimeInSeconds = 5;
        const secondsToMiliseconds = seconds => seconds * 1000;
        const rounds = getRounds(roundQuantity, connectedUsers);
        let round;

        const emitRounds = async () => {
            round = rounds.pop();
            io.emit('round');
            await sleep(secondsToMiliseconds(showScoreTimeInSeconds));
            emitPlays(); // eslint-disable-line
        };

        const emitPlays = async () => {
            play = round.pop();
            io.emit('play', play);
            await sleep(secondsToMiliseconds(showWordTimeInSeconds));
            if (!play.word) {
                play.word = play.words[0]; // eslint-disable-line
            }
            io.emit('word chosen', play);
            await sleep(secondsToMiliseconds(playTimeInSeconds));
            play = null;
            if (round.length) {
                emitPlays();
            } else if (rounds.length) {
                emitRounds();
            } else {
                // io.emit('round');
            }
        };

        emitRounds();
    });

    socket.on('word chosen', (word) => {
        if (play && !word) {
            play.word = word;
        }
    });

    // CANVAS
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    socket.on('clear canvas', () => {
        socket.broadcast.emit('clear canvas');
    });

    socket.on('undo canvas', () => {
        socket.broadcast.emit('undo canvas');
    });

    // CHAT
    socket.on('message', (message) => {
        const { username } = socket;
        if (play && message === play.word) {
            if (username !== play.username && !play.usersThatScored.includes(username)) {
                socket.score += 10; // eslint-disable-line
                usersEmit();
            }
        } else {
            socket.broadcast.emit('message', {
                username,
                message,
            });
        }
    });

    socket.on('disconnect', usersEmit);
});

const {
    SERVER_PORT,
} = process.env;

http.listen(SERVER_PORT, () => {
    console.log(`listening on *:${SERVER_PORT}`);
});
