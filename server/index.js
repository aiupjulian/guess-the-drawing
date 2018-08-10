const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();
const { getRounds } = require('./play');
const { time } = require('../shared/constants');

const emitUsers = () => {
    io.emit(
        'users',
        Object.values(io.sockets.connected)
            .filter(connectedSocket => connectedSocket.username)
            .map(({ username, score }) => ({ username, score })),
    );
};

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const race = promises => Promise.race(promises);

let resolveAllUsersGuessed;
let resolveWordPicked;

let play;
io.on('connection', (socket) => {
    // LOGIN
    socket.on('add user', (username) => {
        socket.username = username; // eslint-disable-line
        socket.score = 0; // eslint-disable-line
        emitUsers();
    });

    // LOBBY
    socket.on('start game', () => {
        socket.broadcast.emit('start game');

        // GAME
        const connectedUsers = Object.values(io.sockets.connected)
            .filter(connectedSocket => connectedSocket.username)
            .map(({ username }) => username);
        const roundQuantity = 3;
        const rounds = getRounds(roundQuantity, connectedUsers);
        let round;

        const emitRounds = async () => {
            round = rounds.pop();
            io.emit('round');
            await sleep(time.SHOW_SCORE_SECONDS);
            emitPlays(); // eslint-disable-line
        };

        const emitPlays = async () => {
            play = round.pop();
            io.emit('play', play);
            const chooseWordPromise = new Promise((resolve) => {
                resolveWordPicked = resolve;
            });
            await race([chooseWordPromise, sleep(time.SHOW_WORD_SECONDS)]);
            // also could skip player
            if (!play.word) {
                play.word = play.words[0]; // eslint-disable-line
            }
            io.emit('word chosen', play);
            const allUsersGuessedPromise = new Promise((resolve) => {
                resolveAllUsersGuessed = resolve;
            });
            await race([allUsersGuessedPromise, sleep(time.PLAY_SECONDS)]);
            play = null;
            if (round.length) {
                emitPlays();
            } else if (rounds.length) {
                emitRounds();
            } else {
                io.emit('round');
            }
        };

        emitRounds();
    });

    socket.on('word chosen', (word) => {
        play.word = word;
        resolveWordPicked();
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
                const usersLength = Object.values(io.sockets.connected)
                    .filter(connectedSocket => connectedSocket.username).length;
                if (play.usersThatScored.push(username) === usersLength - 1) {
                    resolveAllUsersGuessed();
                }
                socket.score += 10; // eslint-disable-line
                emitUsers();
            }
        } else {
            socket.broadcast.emit('message', {
                username,
                message,
            });
        }
    });

    socket.on('disconnect', () => emitUsers);
});

const {
    SERVER_PORT,
} = process.env;

http.listen(SERVER_PORT, () => {
    console.log(`listening on *:${SERVER_PORT}`);
});
