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

io.on('connection', (socket) => {
    // LOGIN
    socket.on('add user', (username) => {
        socket.username = username;
        socket.score = 0;
        usersEmit();
    });

    // LOBBY
    socket.on('start game', () => {
        socket.broadcast.emit('start game');

        const roundQuantity = 3;
        const connectedUsers = Object.values(io.sockets.connected)
            .filter(connectedSocket => connectedSocket.username)
            .map(({ username }) => username);
        const playIntervalSeconds = 2;
        const secondsToMiliseconds = seconds => seconds * 1000;
        const rounds = getRounds(roundQuantity, connectedUsers);
        console.log(rounds);
        
        let round;

        const playsEmitter = () => {
            setTimeout(() => {
                const currentPlay = round.pop();
                io.emit('play', currentPlay);
                if (round.length) {
                    playsEmitter();
                } else if (rounds.length) {
                    roundEmmitter();
                }
            }, secondsToMiliseconds(playIntervalSeconds));
        };
        const roundEmmitter = () => {
            round = rounds.pop();
            io.emit('round');
            playsEmitter();
        };
        roundEmmitter();
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
        socket.broadcast.emit('message', {
            username,
            message,
        });
    });

    socket.on('disconnect', usersEmit);
});

const {
    SERVER_PORT,
} = process.env;

http.listen(SERVER_PORT, () => {
    console.log(`listening on *:${SERVER_PORT}`);
});
