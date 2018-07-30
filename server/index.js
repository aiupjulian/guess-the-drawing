const port = 3000;
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static(process.cwd() + '/client'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });
    socket.on('clearCanvas', () => {
        socket.broadcast.emit('clearCanvas');
    });
    socket.on('undoCanvas', () => {
        socket.broadcast.emit('undoCanvas');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
