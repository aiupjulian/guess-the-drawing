const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8081;

const usersEmit = () => {
    io.emit(
        'users',
        Object.values(io.sockets.connected)
            .filter(socket => socket.username)
            .map(({ username, score }) => ({ username, score })),
    );
};

io.on('connection', (socket) => {
    let addedUser = false;

    socket.on('add user', (username) => {
        if (addedUser) return;
        addedUser = true;
        socket.username = username;
        socket.score = 0;
        usersEmit();
    });

    socket.on('start game', (data) => {
        socket.broadcast.emit('start game', data);
        setTimeout(() => {
            io.emit('start play', io.sockets)
        }, 9000);
    });

    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    socket.on('clear canvas', () => {
        socket.broadcast.emit('clear canvas');
    });

    socket.on('undo canvas', () => {
        socket.broadcast.emit('undo canvas');
    });

    socket.on('message', (data) => {
        socket.broadcast.emit('message', {
            username: socket.username,
            message: data,
        });
    });

    socket.on('disconnect', usersEmit);
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});
